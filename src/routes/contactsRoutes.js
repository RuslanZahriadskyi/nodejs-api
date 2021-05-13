const express = require("express");
const router = express.Router();
const contactsControllers = require("../controllers/contacts");

router
  .get("/", contactsControllers.getAllContacts)
  .get("/:contactId", contactsControllers.getContactById)
  .post("/", contactsControllers.createContact)
  .delete("/:contactId", contactsControllers.removeContact)
  .patch("/:contactId", contactsControllers.updateContact);

module.exports = router;
