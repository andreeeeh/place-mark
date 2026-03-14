import { User } from "./user.js";

export const userMongoStore = {
  async addUser(user) {
    const newUser = new User(user);
    newUser.isAdmin = false;
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
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
