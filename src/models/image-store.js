import * as cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) return reject(error);
          resolve(result.url);
        })
        .end(imagefile);
    });
  },

  deleteImage: async function (img) {
    await cloudinary.v2.uploader.destroy(img, {});
  },
};
