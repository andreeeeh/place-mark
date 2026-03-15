import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase.js";

function toUserModel(user) {
  if (!user?.exists()) return null;
  return {
    _id: user.id,
    ...user.data(),
  };
}

export const userFirebaseStore = {
  async addUser(user) {
    const docRef = await addDoc(collection(db, "users"), { ...user, isAdmin: false });
    return this.getUserById(docRef.id);
  },

  async getAllUsers() {
    const users = await getDocs(collection(db, "users"));
    return users.docs.map((user) => toUserModel(user));
  },

  async getUserById(id) {
    if (id) {
      const user = await getDoc(doc(db, "users", id));
      return toUserModel(user);
    }
    return null;
  },

  async getUserByEmail(email) {
    if (!email) return null;

    const q = query(collection(db, "users"), where("email", "==", email));
    const users = await getDocs(q);
    if (users.empty) return null;
    return toUserModel(users.docs[0]);
  },

  async toggleAdmin(updatedUser) {
    const user = await this.getUserById(updatedUser?._id);
    const docRef = doc(db, "users", user._id);
    await updateDoc(docRef, { isAdmin: !user.isAdmin });
    return this.getUserById(user._id);
  },

  async deleteUserById(id) {
    await deleteDoc(doc(db, "users", id));
  },

  async deleteAll() {
    const users = await this.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.deleteUserById(users[i]._id);
    }
  },
};
