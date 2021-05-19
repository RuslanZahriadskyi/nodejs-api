const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repository = {
      contacts: new ContactsRepository(),
    };
  }

  async getAllContacts() {
    const data = await this.repository.contacts.getAllContacts();
    return data;
  }

  async getContactById(id) {
    const data = await this.repository.contacts.getContactById(id);
    return data;
  }

  async createContact(body) {
    const data = await this.repository.contacts.createContact(body);
    return data;
  }

  async updateContact(id, body) {
    const data = await this.repository.contacts.updateContact(id, body);
    return data;
  }

  async removeContact(id) {
    const data = await this.repository.contacts.removeContact(id);

    return data;
  }

  async updateStatusContact(id, body) {
    const data = await this.repository.contacts.updateStatusContact(id, body);
    return data;
  }
}

module.exports = ContactsService;
