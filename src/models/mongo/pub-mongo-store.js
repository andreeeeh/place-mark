import { Pub } from "./pub.js";

export const pubMongoStore = {
  async addPub(pub) {
    const newPub = new Pub(pub);
    const pubObj = await newPub.save();
    return this.getPubById(pubObj._id);
  },

  async getPubById(id) {
    if (!id) return null;
    const pub = await Pub.findOne({ _id: id }).lean();
    return pub;
  },

  async getUserPubs(userId) {
    const userPubs = await Pub.find({ userId }).lean();
    return userPubs;
  },

  async getAllPubs() {
    const pubs = await Pub.find().lean();
    return pubs;
  },

  async deletePubById(id) {
    try {
      await Pub.deleteOne({ _id: id });
    } catch (err) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await Pub.deleteMany({});
  },
};
