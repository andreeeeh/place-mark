import { db } from "../models/db.js";

export const settingsController = {
  index: {
    handler: async function (request, h) {
      if (!request.auth.credentials?.isAdmin) {
        return h.redirect("/dashboard");
      }
      const users = await db.userStore.getAllUsers();
      const pubs = await db.pubStore.getAllPubs();
      const usersWithPubCount = users.map((user) => ({
        ...user,
        pubCount: pubs.filter((pub) => String(pub.userId) === String(user._id)).length,
      }));
      return h.view("settings-view", {
        title: "Settings",
        isAdmin: !!request.auth.credentials.isAdmin,
        users: usersWithPubCount,
        totalUsers: users.length,
      });
    },
  },

  deleteUser: {
    handler: async function (request, h) {
      if (!request.auth.credentials?.isAdmin) {
        return h.redirect("/dashboard");
      }
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/settings");
    },
  },

  toggleAdmin: {
    handler: async function (request, h) {
      if (!request.auth.credentials?.isAdmin) {
        return h.redirect("/dashboard");
      }
      await db.userStore.toggleAdmin({ _id: request.params.id });

      return h.redirect("/settings");
    },
  },
};
