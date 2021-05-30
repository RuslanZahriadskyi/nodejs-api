const { UserRepository } = require("../repository");

class UsersService {
  constructor() {
    this.repository = {
      users: new UserRepository(),
    };
  }

  async create(body) {
    const data = await this.repository.users.createUser(body);
    return data;
  }

  async getUserByEmail(email) {
    const data = await this.repository.users.getUserByEmail(email);
    return data;
  }

  async getUserById(id) {
    const data = await this.repository.users.getUserById(id);
    return data;
  }

  async getCurrentUser(id) {
    const data = await this.repository.users.getCurrentUser(id);
    return data;
  }

  async updateSubscriptionStatus(id) {
    const data = await this.repository.users.updateSubscriptionStatus(id);
    return data;
  }
}

module.exports = UsersService;
