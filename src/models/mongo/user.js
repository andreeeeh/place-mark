import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: Boolean,
});

export const User = mongoose.model("User", userSchema);
