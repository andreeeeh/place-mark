import { User } from "./user.js";
import { hashPassword } from "../password-utils.js";

function toPublicUser(user) {
  if (!user) {
    return null;
  }
  const { password, ...publicUser } = user;
  return publicUser;
}

export const userMongoStore = {
  async addUser(user) {
    const hashedPassword = await hashPassword(user.password);
    const newUser = new User({ ...user, password: hashedPassword });
    newUser.isAdmin = false;
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getAllUsers() {
    const users = await User.find().lean();
    return users.map((user) => toPublicUser(user));
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return toPublicUser(user);
    }
    return null;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email }).lean();
    return user;
  },

  async toggleAdmin(updatedUser) {
    const user = await User.findOne({ _id: updatedUser._id });
    user.isAdmin = !user.isAdmin;
    await user.save();
    return this.getUserById(updatedUser._id);
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
