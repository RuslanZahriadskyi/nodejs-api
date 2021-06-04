const Contact = require("../schemas/contacts");

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAllContacts(userId, query) {
    const { limit = 5, offset = 0, sortBy, sortByDesc, filter } = query;

    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: 1 } : {}),
        },
        select: filter ? filter.split("|").join("") : "",
        populate: {
          path: "owner",
          select: "name email subscription",
        },
      }
    );

    return result;
  }

  async getContactById(userId, id) {
    try {
      const contact = await this.model
        .findOne({ _id: id, owner: userId })
        .populate({
          path: "owner",
          select: "name email subscription",
        });
      return contact;
    } catch (error) {
      error.status = 400;
      error.data = "Bad Request";
      throw error;
    }
  }

  async createContact(userId, body) {
    const contact = await this.model.create({ ...body, owner: userId });
    return contact;
  }

  async updateContact(userId, id, body) {
    const changedContact = await this.model.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return changedContact;
  }

  async removeContact(userId, id) {
    const deletedContact = await this.model.findOneAndDelete({
      _id: id,
      owner: userId,
    });
    return deletedContact;
  }

  async updateStatusContact(userId, id, body) {
    const newStatus = await this.model.findOneAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return newStatus;
  }
}

module.exports = ContactsRepository;
