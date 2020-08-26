const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Follow = require("../models/Follow");
const User = require("../models/User");

//follow a user
router.post("/", auth, async (req, res) => {
  const follower = req.user.id;
  const following = req.body.id;

  try {
    const user = await User.findById(following);
    if (!user) {
      return res.status(400).json({ msg: "user invalid" });
    }

    const checkFollow = await Follow.findOne({
      follower,
      "following.id": user.id,
    });
    if (checkFollow) {
      return res.status(400).json({ msg: "You already follow this user" });
    }

    const follow = new Follow({
      follower,
      following: {
        username: user.username,
        id: user.id,
        bio: user.bio,
      },
    });

    await follow.save();
    res.json({ msg: "User followed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//get all followers or following
router.get("/:id", auth, async (req, res) => {
  const type = req.params.id;
  const user = req.user.id;

  try {
    if (type === "followers") {
      const followers = await Follow.find({ "following.id": user });
      return res.json(followers);
    } else if (type === "following") {
      const following = await Follow.find({ follower: user });
      return res.json(following);
    } else {
      return res.status(400).json({ msg: `cannot get /api/follow/${type}` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//unfollow a user
router.delete("/", auth, async (req, res) => {
  const follower = req.user.id;
  const following = req.body.username;

  try {
    const user = await User.findOne({ username: following });
    if (!user) {
      return res.status(400).json({ msg: "user invalid" });
    }

    const checkFollow = await Follow.findOne({ follower, following });
    if (!checkFollow) {
      return res.status(400).json({ msg: "You do not follow this user" });
    }

    await Follow.findByIdAndRemove(checkFollow.id);
    res.json({ msg: "User unfollowed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
