const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    msg: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    recieverName: {
      type: String,
      required: true,
    },
    senderAv: {
      type: Boolean,
      required: true,
    },
    recieverAv: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("messages", messageSchema);
