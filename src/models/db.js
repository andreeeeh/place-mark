import { userMongoStore } from "./mongo/user-mongo-store.js";
import { pubMongoStore } from "./mongo/pub-mongo-store.js";
import { userFirebaseStore } from "./firebase/user-firebase-store.js";
import { pubFirebaseStore } from "./firebase/pub-firebase-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  pubStore: null,

  init(storeType = "mongo") {
    switch (storeType) {
      case "firebase":
        this.userStore = userFirebaseStore;
        this.pubStore = pubFirebaseStore;
        break;
      case "mongo":
      default:
        this.userStore = userMongoStore;
        this.pubStore = pubMongoStore;
        connectMongo();
        break;
    }
  },
};
