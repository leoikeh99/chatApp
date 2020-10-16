const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const Follow = require("../models/Follow");
const User = require("../models/User");

//follow a user
router.post("/", auth, async (req, res) => {
  const following = req.body.id;

  try {
    const follower = await User.findById(req.user.id);
    const user = await User.findById(following);
    if (!user) {
      return res.status(400).json({ msg: "user invalid" });
    }

    const checkFollow = await Follow.findOne({
      "follower.id": follower.id,
      "following.id": user.id,
    });
    if (checkFollow) {
      return res.status(400).json({ msg: "You already follow this user" });
    }

    const follow = new Follow({
      follower: {
        username: follower.username,
        id: follower.id,
        bio: follower.bio,
        joined: follower.createdAt,
        avatar: follower.avatar ? true : false,
      },
      following: {
        username: user.username,
        id: user.id,
        bio: user.bio,
        joined: user.createdAt,
        avatar: user.avatar ? true : false,
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
      const data = followers.map(async (value) => {
        const check = await Follow.findOne({
          "follower.id": user,
          "following.id": value.follower.id,
        });
        const checkAvatar = await User.findById(value.follower.id);
        const avatar = checkAvatar.avatar;
        return {
          username: value.follower.username,
          bio: value.follower.bio,
          id: value.follower.id,
          following: check ? true : false,
          joined: value.follower.joined,
          avatar: avatar ? true : false,
        };
      });
      Promise.all(data).then((value) => {
        res.json(value);
      });
    } else if (type === "following") {
      const following = await Follow.find({ "follower.id": user });
      const data = following.map(async (value) => {
        const check = await Follow.findOne({
          "follower.id": value.following.id,
          "following.id": user,
        });
        const checkAvatar = await User.findById(value.following.id);
        const avatar = checkAvatar.avatar;
        return {
          username: value.following.username,
          bio: value.following.bio,
          id: value.following.id,
          following: true,
          followed: check ? true : false,
          joined: value.following.joined,
          avatar: avatar ? true : false,
        };
      });
      Promise.all(data).then((value) => {
        res.json(value);
      });
    } else {
      return res.status(400).json({ msg: `cannot get /api/follow/${type}` });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//unfollow a user
router.delete("/:id", auth, async (req, res) => {
  const id = req.user.id;
  const following = req.params.id;

  try {
    const user = await User.findById(following);
    if (!user) {
      return res.status(400).json({ msg: "user invalid" });
    }

    const checkFollow = await Follow.findOne({
      "follower.id": id,
      "following.id": user.id,
    });
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
