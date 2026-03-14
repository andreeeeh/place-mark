import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pubMongoStore } from "./mongo/pub-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  pubStore: null,

  init() {
    this.userStore = userMongoStore;
    this.pubStore = pubMongoStore;
    connectMongo();
  },
};
