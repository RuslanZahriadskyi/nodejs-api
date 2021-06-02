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
    await contacts.getContactById({}, res, next);
    expect(next).toBeCalledTimes(1);
  });
});
