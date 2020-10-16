const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Message = require("../models/Message");
const User = require("../models/User");

router.post("/", auth, async (req, res) => {
  const sender = req.user.id;
  const { reciever, message } = req.body;

  try {
    const checkReciever = await User.findOne({ username: reciever });
    if (!checkReciever) {
      return res.status(400).json({ msg: "Not a user!!!" });
    }

    if (checkReciever.id === sender) {
      return res.status(400).json({ msg: "cannot send message to yourself" });
    }

    const send = new Message({
      sender,
      reciever: checkReciever.id,
      message,
    });

    const sentMessage = await send.save();
    res.json({ sentMessage });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//get chat
router.get("/:id", auth, async (req, res) => {
  const sender = req.user.id;
  const reciever = req.params.id;

  try {
    const checkReciever = await User.findById(reciever);
    if (!checkReciever) {
      return res.status(400).json({ msg: "Not a user!!!" });
    }

    if (checkReciever.id === sender) {
      return res.status(400).json({ msg: "cannot send message to yourself" });
    }

    const messages = await Message.find({
      $or: [
        { sender, reciever: checkReciever.id },
        { sender: checkReciever.id, reciever: sender },
      ],
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//get all messages
router.get("/", auth, async (req, res) => {
  const sender = req.user.id;

  try {
    const messages = await Message.find({
      $or: [{ sender }, { reciever: sender }],
    });
    res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
