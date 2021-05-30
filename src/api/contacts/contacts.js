const express = require("express");
const router = express.Router();
const contactsControllers = require("../../controllers/contacts");
const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatus,
} = require("../../validator/contacts");
const guard = require("../../helpers/guard");

router
  .get("/", guard, contactsControllers.getAllContacts)
  .post("/", guard, validateCreateContact, contactsControllers.createContact);

router
  .get("/:contactId", guard, contactsControllers.getContactById)
  .delete("/:contactId", guard, contactsControllers.removeContact)
  .put(
    "/:contactId",
    guard,
    validateUpdateContact,
    contactsControllers.updateContact
  )
  .patch(
    "/:contactId",
    guard,
    validateUpdateStatus,
    contactsControllers.updateStatusContact
  );

module.exports = router;
