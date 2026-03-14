import { PubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

function mapPubPayload(payload) {
  return {
    name: payload.name,
    description: payload.description,
    latitude: Number(payload.latitude),
    longitude: Number(payload.longitude),
    categories: {
      daytime: !!payload.daytime,
      nighttime: !!payload.nighttime,
      liveMusic: !!payload.liveMusic,
      dj: !!payload.dj,
    },
  };
}

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pubs = await db.pubStore.getAllPubs();
      pubs.forEach((pub) => {
        pub.isAuthor = String(pub.userId) === String(userId);
      });
      return h.view("dashboard", { pubs });
    },
  },

  create: {
    validate: {
      payload: PubSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const userId = request.auth.credentials._id;
        const pubs = await db.pubStore.getAllPubs();
        pubs.forEach((pub) => {
          pub.isAuthor = String(pub.userId) === String(userId);
        });
        const form = mapPubPayload(request.payload);
        return h.view("dashboard", { pubs, form, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pub = mapPubPayload(request.payload);
      await db.pubStore.addPub({ ...pub, userId });
      return h.redirect("/dashboard");
    },
  },

  edit: {
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pubs = await db.pubStore.getAllPubs();
      pubs.forEach((pub) => {
        pub.isAuthor = String(pub.userId) === String(userId);
      });
      const pub = await db.pubStore.getPubById(request.params.id);

      if (!pub || String(pub.userId) !== String(userId)) {
        return h.redirect("/dashboard");
      }

      return h.view("dashboard", {
        pubs,
        pubId: pub._id,
        form: pub,
      });
    },
  },

  update: {
    validate: {
      payload: PubSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const userId = request.auth.credentials._id;
        const pubs = await db.pubStore.getAllPubs();
        pubs.forEach((pub) => {
          pub.isAuthor = String(pub.userId) === String(userId);
        });
        return h
          .view("dashboard", {
            pubs,
            pubId: request.params.id,
            form: mapPubPayload(request.payload),
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const existingPub = await db.pubStore.getPubById(request.params.id);
      if (!existingPub || String(existingPub.userId) !== String(userId)) {
        return h.redirect("/dashboard");
      }

      const updatedPub = mapPubPayload(request.payload);
      await db.pubStore.updatePub({
        _id: existingPub._id,
        userId,
        ...updatedPub,
      });
      return h.redirect("/dashboard");
    },
  },

  delete: {
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      let pub;
      try {
        pub = await db.pubStore.getPubById(request.params.id);
      } catch {
        return h.redirect("/dashboard");
      }
      if (pub && String(pub.userId) === String(userId)) {
        await db.pubStore.deletePubById(request.params.id);
      }
      return h.redirect("/dashboard");
    },
  },

  category: {
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pubs = await db.pubStore.getPubByCategory(request.params.category);
      pubs.forEach((pub) => {
        pub.isAuthor = String(pub.userId) === String(userId);
      });
      return h.view("dashboard", { pubs, category: request.params.category });
    },
  },
};
