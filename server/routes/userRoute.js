const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(401).send("Users not found");
    }
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    user = new User({
      username,
      email,
      password,
      lists: [],
      cards: [],
      boards: [],
      isStarred: [],
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
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error in saving");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
    });
    if (!user)
      return res.status(400).json({
        message: "User does not exist",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Username or Password",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, "randomString", { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id).populate("boards");
    res.json({
      username: user.username,
      email: user.email,
      boards: user.boards,
      isStarred: user.isStarred,
    });
  } catch (error) {
    console.log(error);
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
