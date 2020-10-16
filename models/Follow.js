const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  follower: {
    username: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    bio: {
      type: String,
    },
    joined: {
      type: Date,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
  },
  following: {
    username: {
      type: String,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    bio: {
      type: String,
    },
    joined: {
      type: Date,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("follows", followSchema);
