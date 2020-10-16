const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Follow = require("../models/Follow");
const auth = require("../middleware/auth");

const url = config.get("mongoURI");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { createConnection } = require("mongoose");
const conn = createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//Login a user
router.post(
  "/",
  check("password", "Password is needed").exists(),
  check("email", "Email invalid").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const checkPass = await bcrypt.compare(password, user.password);

      if (!checkPass) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "server error" });
    }
  }
);

router.get("/avatar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const checkAv = user.avatar;
    if (user.avatar) {
      gfs.files.findOne({ _id: checkAv }, (err, file) => {
        if (!file || file.length === 0) {
          avatar = null;
        }

        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png" ||
          file.contentType === "image/jpg"
        ) {
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        }
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "server error" });
  }
});

//get a user
router.get("/", auth, async (req, res) => {
  const value = req.query.value;
  const id = req.user.id;

  if (!value) {
    try {
      const user = await User.findById(id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "server error" });
    }
  } else {
    try {
      const users = await User.find({});

      const search = users.filter((user) => {
        const regex = new RegExp(`${value}`, "gi");
        return user.username.match(regex);
      });

      const check = search.map(async (value) => {
        const following = await Follow.findOne({
          "follower.id": id,
          "following.id": value.id,
        });
        const followed = await Follow.findOne({
          "follower.id": value.id,
          "following.id": id,
        });

        return {
          username: value.username,
          id: value.id,
          bio: value.bio,
          joined: value.createdAt,
          avatar: value.avatar ? true : false,
          following: following ? true : false,
          followed: followed ? true : false,
        };
      });

      Promise.all(check).then((value) => {
        res.json(value);
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "server error" });
    }
  }
});

module.exports = router;
