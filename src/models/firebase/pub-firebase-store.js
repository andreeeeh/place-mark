import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { db } from "../firebase.js";

function toPubModel(pub) {
  if (!pub?.exists()) return null;
  return {
    _id: pub.id,
    ...pub.data(),
  };
}

export const pubFirebaseStore = {
  async addPub(pub) {
    const docRef = await addDoc(collection(db, "pubs"), pub);
    return this.getPubById(docRef.id);
  },

  async getPubById(id) {
    if (!id) return null;

    const pub = await getDoc(doc(db, "pubs", id));
    return toPubModel(pub);
  },

  async getUserPubs(userId) {
    const q = query(collection(db, "pubs"), where("userId", "==", String(userId)));
    const pubs = await getDocs(q);
    return pubs.docs.map((pub) => toPubModel(pub));
  },

  async getPubByCategory(category) {
    const q = query(collection(db, "pubs"), where(`categories.${category}`, "==", true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((pub) => toPubModel(pub));
  },

  async getAllPubs() {
    const querySnapshot = await getDocs(collection(db, "pubs"));
    return querySnapshot.docs.map((pub) => toPubModel(pub));
  },

  async updatePub(updatedPub) {
    const docRef = doc(db, "pubs", updatedPub._id);
    const { _id, ...pubData } = updatedPub;
    await updateDoc(docRef, { ...pubData });
  },

  async deletePubById(id) {
    await deleteDoc(doc(db, "pubs", id));
  },

  async deleteAll() {
    const pubs = await this.getAllPubs();

    for (let i = 0; i < pubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.deletePubById(pubs[i]._id);
    }
  },
};
