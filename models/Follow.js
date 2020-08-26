const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
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
  },
});

module.exports = mongoose.model("follows", followSchema);
