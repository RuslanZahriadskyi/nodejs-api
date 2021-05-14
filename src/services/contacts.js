const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repository = {
      contacts: new ContactsRepository(),
    };
  }

  getAllContacts() {
    const data = this.repository.contacts.getAllContacts();
    return data;
  }

  getContactById(id) {
    const data = this.repository.contacts.getContactById(id);
    return data;
  }

  createContact(body) {
    const data = this.repository.contacts.createContact(body);
    return data;
  }

  updateContact(id, body) {
    const data = this.repository.contacts.updateContact(id, body);

    return data;
  }

  removeContact(id) {
    const data = this.repository.contacts.removeContact(id);

    return data;
  }
}

module.exports = ContactsService;
