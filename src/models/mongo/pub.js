import mongoose from "mongoose";

const pubSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  categories: {
    daytime: { type: Boolean, default: false },
    nighttime: { type: Boolean, default: false },
    liveMusic: { type: Boolean, default: false },
    dj: { type: Boolean, default: false },
  },
});

export const Pub = mongoose.model("Pub", pubSchema);
