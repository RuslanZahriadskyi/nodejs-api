const { UserRepository } = require("../repository");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises;
const { ErrorHandler } = require("../helpers/errorHandler");
require("dotenv").config();

class UsersService {
  constructor() {
    this.cloudinary = cloudinary;
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
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

  async updateSubscriptionStatus(id, body) {
    const data = await this.repository.users.updateSubscriptionStatus(id, body);
    return data;
  }

  async updateAvatars(id, filePath) {
    try {
      const { secure_url: avatar, public_id: avatarId } =
        await this.#uploadCloudinaryImage(filePath);
      const oldAvatar = await this.repository.users.getAvatar(id);
      if (oldAvatar) {
        this.cloudinary.uploader.destroy(oldAvatar.avatarId, (err, result) => {
          console.log(err, result);
        });
      }
      await this.repository.users.updateAvatars(id, avatar, avatarId);
      await fs.unlink(filePath);
      return avatar;
    } catch (error) {
      throw new ErrorHandler(null, "Error upload avatar");
    }
  }

  #uploadCloudinaryImage = (filePath) => {
    return new Promise((res, rej) => {
      this.cloudinary.uploader.upload(
        filePath,
        { folder: "avatars", transformation: { width: 250, crop: "pad" } },
        (error, result) => {
          console.log(result);
          if (error) {
            return rej(err);
          }
          if (result) {
            return res(result);
          }
        }
      );
    });
  };
}

module.exports = UsersService;
