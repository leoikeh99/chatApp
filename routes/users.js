const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const url = config.get("mongoURI");
const GridFSBucket = require("multer-gridfs-storage");
const User = require("../models/User");
const auth = require("../middleware/auth");
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

const crypto = require("crypto");
const path = require("path");

const storage = new GridFSBucket({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

router.post(
  "/",
  check("username", "Username is required").not().isEmpty(),
  check("email", "Email invalid").isEmail(),
  check("password", "Password should be at least 6 characters").isLength({
    min: 6,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      const checkUsername = await User.findOne({ username });
      const checkemail = await User.findOne({ email });

      if (checkUsername) {
        return res.status(400).json({ msg: "username already exists" });
      }
      if (checkemail) {
        return res.status(400).json({ msg: "email already exists" });
      }

      var user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      console.error(err.message);
      res.status(500).json({ msg: "server error" });
    }
  }
);

router.put("/", auth, upload.single("avatar"), async (req, res) => {
  const id = req.user.id;
  const { username, email, bio } = JSON.parse(req.body.data);
  try {
    const user = await User.findById(id);
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    if (bio) update.bio = bio;

    if (req.file) {
      if (
        req.file.contentType === "image/jpeg" ||
        req.file.contentType === "image/png" ||
        req.file.contentType === "image/jpg"
      ) {
        if (user.avatar) {
          gfs.remove(
            { _id: user.avatar, root: "uploads" },
            (err, gridStore) => {
              if (err) {
                res.status(400).json({ err });
              }
            }
          );
        }
        update.avatar = req.file.id;
      }
    }
    await User.findByIdAndUpdate(id, { $set: update }, { new: true });

    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
