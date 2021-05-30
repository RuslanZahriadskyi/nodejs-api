const User = require("../schemas/user");

class UserRepository {
  constructor() {
    this.User = User;
  }

  async createUser(body) {
    const user = new this.User(body);
    return user.save();
  }

  async getUserByEmail(email) {
    const user = await this.User.findOne({ email });
    return user;
  }

  async getUserById(id) {
    const user = await this.User.findOne({ _id: id });
    return user;
  }

  async updateToken(id, token) {
    await this.User.updateOne({ _id: id }, { token });
  }

  async getCurrentUser(id) {
    const { name, email, subscription } = await this.User.findOne({ _id: id });
    return { name, email, subscription };
  }

  async updateSubscriptionStatus(id) {
    const { name, email, subscription } = await this.User.findOne({ _id: id });
    return { name, email, subscription };
  }
  //   async updateSubscriptionStatus(id, body) {
  //     console.log(id);
  //     const user = await this.User.findOneAndUpdate(
  //       { _id: id },
  //       { ...body },
  //       { new: true }
  //     );
  //     return user;
  //   }
}

module.exports = UserRepository;