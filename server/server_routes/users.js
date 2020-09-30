const express = require("express");
const router = express.Router();
const User = require("../server_models/User");

// GET ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
  res.send("We are on users");
});

// SUBMIT/REGISTER A USER
router.post("/", async (req, res) => {
  const user = new User({
    user_type: req.body.user_type,
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    affiliation: req.body.affiliation,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    datetime_updated: Date.now,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC USER
router.get("/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC USER
router.delete("/:user_id", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.user_id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC USER
router.patch("/:user_id", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.user_id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
