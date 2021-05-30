const { HttpCode } = require("../helpers/constants");
const { ContactsService } = require("../services");
const contactsServices = new ContactsService();

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await contactsServices.getAllContacts(userId, req.query);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.getContactById(
      userId,
      req.params.contactId
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

const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await contactsServices.createContact(userId, req.body);

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
    const userId = req.user.id;
    const contact = await contactsServices.removeContact(
      userId,
      req.params.contactId
    );
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
    const userId = req.user.id;
    const contact = await contactsServices.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (contact === null) {
      return next({
        status: HttpCode.NOT_FOUND,
        message: `Contact does not exist`,
        data: "Contact does not exist",
      });
    }

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
    const userId = req.user.id;
    const contact = await contactsServices.updateStatusContact(
      userId,
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
