const { v4: uuid } = require("uuid");
const db = require("../db/contactsDb");

class ContactsRepository {
  getAllContacts() {
    console.log(db.get("contacts"));
    return db.get("contacts");
  }

  getContactById(id) {
    return db.get("posts").find({ id }).value();
  }

  createContact(body) {
    const id = uuid();
    const newContact = {
      id,
      ...body,
    };

    db.get("posts").push(newContact).write();

    return newContact;
  }

  updateContact(id, body) {
    const changedContact = db.get("contacts").find({ id }).assign(body).value();

    db.write();

    return changedContact;
  }

  removeContact(id) {
    const [contact] = db.get("posts").remove({ id }).write();
    return contact;
  }
}

module.exports = ContactsRepository;
