const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAllContacts() {
    const contacts = await this.model.find({});
    return contacts;
  }

  async getContactById(id) {
    try {
      const contact = await this.model.findOne({ _id: id });
      return contact;
    } catch (error) {
      error.status = 400;
      error.data = "Bad Request";
      throw error;
    }
  }

  async createContact(body) {
    const contact = await this.model.create(body);
    return contact;
  }

  async updateContact(id, body) {
    const changedContact = await this.model.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );

    return changedContact;
  }

  async removeContact(id) {
    const deletedContact = await this.model.findOneAndDelete({ _id: id });
    return deletedContact;
  }

  async updateStatusContact(id, body) {
    const newStatus = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return newStatus;
  }
}

module.exports = ContactsRepository;
