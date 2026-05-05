import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { PubSpec, PubSpecPlus, IdSpec, PubArray, PubCategorySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

function mapPubPayload(payload, userId) {
  return {
    userId,
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

export const pubApi = {
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const userId = request.auth.credentials._id;
        const pub = mapPubPayload(request.payload, userId);
        const newPub = await db.pubStore.addPub(pub);
        if (newPub) {
          return h.response(newPub).code(201);
        }
        return Boom.badImplementation("error creating pub");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a pub",
    notes: "Returns the newly created pub",
    validate: { payload: PubSpec, failAction: validationError },
    response: { schema: PubSpecPlus, failAction: validationError },
  },

  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request) {
      try {
        const pubs = request.query.category ? await db.pubStore.getPubByCategory(request.query.category) : await db.pubStore.getAllPubs();
        return pubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all pubs",
    notes: "Returns details of all pubs",
    validate: {
      query: {
        category: PubCategorySpec,
      },
      failAction: validationError,
    },
    response: { schema: PubArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request) {
      try {
        const pub = await db.pubStore.getPubById(request.params.id);
        if (!pub) {
          return Boom.notFound("No Pub with this id");
        }
        return pub;
      } catch (err) {
        return Boom.notFound("No Pub with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific pub",
    notes: "Returns pub details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PubSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request) {
      try {
        const pub = await db.pubStore.getPubById(request.params.id);
        if (!pub) {
          return Boom.notFound("No Pub with this id");
        }

        const requesterId = request.auth.credentials._id;
        if (String(pub.userId) !== String(requesterId)) {
          return Boom.forbidden("You are not allowed to update this pub");
        }

        const updatedPub = {
          _id: pub._id,
          ...mapPubPayload(request.payload, pub.userId),
        };
        await db.pubStore.updatePub(updatedPub);
        return db.pubStore.getPubById(pub._id);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a pub",
    notes: "Updates a pub and returns the updated pub details",
    validate: {
      params: { id: IdSpec },
      payload: PubSpec,
      failAction: validationError,
    },
    response: { schema: PubSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pub = await db.pubStore.getPubById(request.params.id);
        if (!pub) {
          return Boom.notFound("No Pub with this id");
        }
        await db.pubStore.deletePubById(pub._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.notFound("No Pub with this id");
      }
    },
    tags: ["api"],
    description: "Delete a pub",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pub = await db.pubStore.getPubById(request.params.id);
        if (!pub) {
          return Boom.notFound("No Pub with this id");
        }
        const requesterId = request.auth.credentials._id;
        if (String(pub.userId) !== String(requesterId)) {
          return Boom.forbidden("You are not allowed to update this pub");
        }
        const file = request.payload.imagefile;
        console.log("uploadImage payload type:", typeof file, Buffer.isBuffer(file) ? `Buffer(${file.length})` : file);
        if (file && file.length > 0) {
          const url = await imageStore.uploadImage(file);
          pub.img = url;
          await db.pubStore.updatePub(pub);
        }
        return db.pubStore.getPubById(pub._id);
      } catch (err) {
        console.error("uploadImage error:", err);
        return Boom.serverUnavailable("Image upload failed");
      }
    },
    tags: ["api"],
    description: "Upload an image for a pub",
    notes: "Uploads image to Cloudinary and saves URL on the pub",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PubSpecPlus, failAction: validationError },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.pubStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all pubs",
    notes: "All pubs removed from PlaceMark",
  },
};
