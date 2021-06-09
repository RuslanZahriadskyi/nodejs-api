const contacts = require("./contacts");
const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const {
  contacts: contactsFake,
  newContact,
} = require("../services/__mocks__/data-contacts");

jest.mock("../services");

describe("Unit testing contacts controlller", () => {
  let req, res, next;
  beforeEach(() => {
    req = { user: { id: 1 } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    next = jest.fn((data) => data);
  });

  test("should get all contacts", async () => {
    const result = await contacts.getAllContacts(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result).toHaveProperty("status", "success");
    expect(result).toHaveProperty("code", HttpCode.OK);
    expect(result).toHaveProperty("data");
  });

  test("should be error when it is necessary get all contacts", async () => {
    await contacts.getAllContacts({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should find contact by id", async () => {
    const { _id, name, email, phone, favorite, owner } = contactsFake[0];

    req.params = { id: _id };
    req.user.id = owner;

    const result = await contacts.getContactById(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("email", email);
    expect(result.data.contact).toHaveProperty("phone", phone);
    expect(result.data.contact).toHaveProperty("favorite", favorite);
    expect(result.data.contact).toHaveProperty("owner", owner);
  });

  test("should be error when it is necessary get contact by id", async () => {
    await contacts.getContactById({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should be error when contact doesn`t find", async () => {
    const { _id } = contactsFake[0];

    req.params = { id: _id };
    req.user.id = "60abf0a78955325d2c908900";

    await contacts.getContactById(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Contact does not exist`,
      data: "Contact does not exist",
    });
  });

  test("should create contact", async () => {
    const { name, email, phone, favorite, owner } = newContact;

    req.body = newContact;
    req.user.id = owner;

    const result = await contacts.createContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id");
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("email", email);
    expect(result.data.contact).toHaveProperty("phone", phone);
    expect(result.data.contact).toHaveProperty("favorite", favorite);
    expect(result.data.contact).toHaveProperty("owner", owner);
  });

  test("should be error when try create contact", async () => {
    await contacts.createContact({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should update contact", async () => {
    const { _id, owner } = contactsFake[0];

    req.params = { contactId: _id };
    const name = "Updated Contact";
    req.body = { name };
    req.user.id = owner;

    const result = await contacts.updateContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
  });

  test("should get error when try update non existing contact ", async () => {
    req.params = { contactId: 1 };
    const name = "Updated Contact";
    req.body = { name };

    await contacts.updateContact(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Contact does not exist`,
      data: "Contact does not exist",
    });
  });

  test("should be error when try update contact ", async () => {
    await contacts.updateContact({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should remove contact", async () => {
    const { _id, owner, name, email, phone } = contactsFake[1];

    req.params = { contactId: _id };

    req.user.id = owner;

    const result = await contacts.removeContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("name", name);
    expect(result.data.contact).toHaveProperty("email", email);
    expect(result.data.contact).toHaveProperty("phone", phone);
  });

  test("should get error when try remove contact", async () => {
    req.params = { contactId: 1 };

    await contacts.removeContact(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Contact does not exist`,
      data: "Contact does not exist",
    });
  });

  test("should be error when try remove contact", async () => {
    await contacts.removeContact({}, res, next);
    expect(next).toBeCalledTimes(1);
  });

  test("should update contact status", async () => {
    const { _id, owner } = contactsFake[0];

    req.params = { contactId: _id };
    const favorite = false;
    req.body = { favorite };
    req.user.id = owner;

    const result = await contacts.updateStatusContact(req, res, next);
    expect(ContactsService).toHaveBeenCalled();
    expect(result).toBeDefined();
    expect(result.data.contact).toHaveProperty("_id", _id);
    expect(result.data.contact).toHaveProperty("favorite", favorite);
  });

  test("should get error when try update non existing  status  contact ", async () => {
    req.params = { contactId: 1 };
    const favorite = true;
    req.body = { favorite };

    await contacts.updateStatusContact(req, res, next);
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith({
      status: HttpCode.NOT_FOUND,
      message: `Contact does not exist`,
      data: "Contact does not exist",
    });
  });

  test("should be error when try update status contact ", async () => {
    await contacts.updateStatusContact({}, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
