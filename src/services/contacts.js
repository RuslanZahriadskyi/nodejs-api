const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repository = {
      contacts: new ContactsRepository(),
    };
  }

  async getAllContacts(userId, query) {
    const data = await this.repository.contacts.getAllContacts(userId, query);
    const { docs: contacts, totalDocs: total, limit, offset } = data;
    return { contacts, total, limit, offset };
  }

  async getContactById(userId, id) {
    const data = await this.repository.contacts.getContactById(userId, id);
    return data;
  }

  async createContact(userId, body) {
    const data = await this.repository.contacts.createContact(userId, body);
    return data;
  }

  async updateContact(userId, id, body) {
    const data = await this.repository.contacts.updateContact(userId, id, body);
    return data;
  }

  async removeContact(userId, id) {
    const data = await this.repository.contacts.removeContact(userId, id);

    return data;
  }

  async updateStatusContact(userId, id, body) {
    const data = await this.repository.contacts.updateStatusContact(
      userId,
      id,
      body
    );
    return data;
  }
}

module.exports = ContactsService;
