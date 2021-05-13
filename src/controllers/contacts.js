const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsServices = new ContactsService();
const { v4: uuid } = require("uuid");

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
    const contact = await contactsServices.getContactById(req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    }

    return next({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: `Contact by ${req.params} does not exist`,
      data: "Contact does not exist",
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.createContact(req.body);
    const newContact = {
      id: uuid(),
      ...contact,
    };

    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.removeContact(req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {},
      });
    }

    return next({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: `Contact by ${req.params} does not exist`,
      data: "Contact does not exist",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const contact = await contactsServices.updateContact(req.params, req.body);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    }

    return next({
      status: "error",
      code: HttpCode.NOT_FOUND,
      message: `Contact by ${req.params} does not exist`,
      data: "Contact does not exist",
    });
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
};
