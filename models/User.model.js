const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    telephone: Number,
    avatar: String,
    email:
    {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      // check valid email
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },

    passwordHash:
    {
      type: String,
      required: [true, "Password is required"]
    },
  },
  {
    // add properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
