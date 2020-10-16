const express = require("express");
const router = express.Router();

const Unread = require("../models/Unread");
const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/:id", auth, async (req, res) => {
  const reciever = req.user.id;
  const sender = req.params.id;

  try {
    const checkUser = await User.findById(sender);
    if (!checkUser) {
      return res.status(400).json({ msg: "Not a user" });
    }

    const check = await Unread.findOne({ sender, reciever });
    if (!check) {
      const unread = new Unread({
        sender,
        reciever,
        amount: 1,
      });
      await unread.save();
      return res.json({ msg: "sent successfully" });
    } else {
      const id = check._id;
      const amount = check.amount + 1;
      const update = { amount };
      await Unread.findByIdAndUpdate(id, { $set: update }, { new: true });
      return res.json({ msg: "updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

//get all unread
router.get("/", auth, async (req, res) => {
  const reciever = req.user.id;

  try {
    console.log(reciever);
    const unread = await Unread.find({ reciever });
    res.json(unread);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

//get specific unread
router.get("/:id", auth, async (req, res) => {
  const reciever = req.user.id;
  const sender = req.params.id;
  try {
    const checkUser = await User.findById(sender);
    if (!checkUser) {
      return res.status(400).json({ msg: "Not a user" });
    }

    const unread = await Unread.findOne({ sender, reciever });
    res.json(unread);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

//update unread
router.put("/:id", auth, async (req, res) => {
  const reciever = req.user.id;
  const sender = req.params.id;

  try {
    const checkUser = await User.findById(sender);
    if (!checkUser) {
      return res.status(400).json({ msg: "Not a user" });
    }

    const check = await Unread.findOne({ sender, reciever });
    const update = { amount: 0 };
    const id = check._id;
    await Unread.findByIdAndUpdate(id, { $set: update }, { new: true });
    res.json({ msg: "updated succesfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
