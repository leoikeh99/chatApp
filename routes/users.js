const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const auth = require("../middleware/auth");
const { findById } = require("../models/User");

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

router.put("/", auth, async (req, res) => {
  const id = req.user.id;
  const { username, email, bio } = req.body;
  try {
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    if (bio) update.bio = bio;

    const user = await User.findById(id);

    await User.findByIdAndUpdate(id, { $set: update }, { new: true });

    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
