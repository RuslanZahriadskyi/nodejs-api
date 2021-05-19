const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validator/contacts");

router
  .get("/", contactsControllers.getAllContacts)
  .get("/:contactId", contactsControllers.getContactById)
  .post("/", validateCreateContact, contactsControllers.createContact)
  .delete("/:contactId", contactsControllers.removeContact)
  .put("/:contactId", validateUpdateContact, contactsControllers.updateContact);

module.exports = router;
