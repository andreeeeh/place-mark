import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placeMarkService = {
  placeMarkUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.placeMarkUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users`);
    return res.data;
  },

  async deleteUser(id) {
    const res = await axios.delete(`${this.placeMarkUrl}/api/users/${id}`);
    return res.data;
  },

  async toggleAdmin(id) {
    const res = await axios.post(`${this.placeMarkUrl}/api/users/${id}/admin`);
    return res.data;
  },

  async createPub(pub) {
    const res = await axios.post(`${this.placeMarkUrl}/api/pubs`, pub);
    return res.data;
  },

  async getPub(id) {
    const res = await axios.get(`${this.placeMarkUrl}/api/pubs/${id}`);
    return res.data;
  },

  async getAllPubs(category) {
    const url = category ? `${this.placeMarkUrl}/api/pubs?category=${category}` : `${this.placeMarkUrl}/api/pubs`;
    const res = await axios.get(url);
    return res.data;
  },

  async deletePub(id) {
    const res = await axios.delete(`${this.placeMarkUrl}/api/pubs/${id}`);
    return res;
  },

  async deleteAllPubs() {
    const res = await axios.delete(`${this.placeMarkUrl}/api/pubs`);
    return res.data;
  },

  async updatePub(id, pub) {
    const res = await axios.post(`${this.placeMarkUrl}/api/pubs/${id}`, pub);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.placeMarkUrl}/api/users/authenticate`, user);
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    return response.data;
  },

  async clearAuth() {
    // eslint-disable-next-line dot-notation
    axios.defaults.headers.common["Authorization"] = "";
  },
};
