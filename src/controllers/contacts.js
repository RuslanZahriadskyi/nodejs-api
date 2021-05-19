const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsServices = new ContactsService();

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.getAllContacts();
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsServices.getContactById(req.params.contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Contact does not exist`,
        data: "Contact does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.createContact(req.body);

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.removeContact(req.params.contactId);
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {},
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Contact does not exist`,
        data: "Contact does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact.id) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Contact does not exist`,
        data: "Contact does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Contact does not exist`,
        data: "Contact does not exist",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
