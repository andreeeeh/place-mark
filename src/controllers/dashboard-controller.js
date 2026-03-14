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

function pubViewModel(pubs, form = {}) {
  return {
    title: "Your Pubs",
    pubs,
    form,
  };
}

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pubs = await db.pubStore.getUserPubs(userId);
      return h.view("dashboard", pubViewModel(pubs));
    },
  },

  create: {
    validate: {
      payload: PubSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const userId = request.auth.credentials._id;
        const pubs = await db.pubStore.getUserPubs(userId);
        const form = mapPubPayload(request.payload);
        return h
          .view("dashboard", { ...pubViewModel(pubs, form), errors: error.details })
          .takeover()
          .code(400);
      },
    },
    handler: async function (request, h) {
      const userId = request.auth.credentials._id;
      const pub = mapPubPayload(request.payload);
      await db.pubStore.addPub({ ...pub, userId });
      return h.redirect("/dashboard");
    },
  },
};
