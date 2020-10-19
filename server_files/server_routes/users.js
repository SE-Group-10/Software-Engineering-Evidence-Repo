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

// GET SPECIFIC USER BY EMAIL
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT/REGISTER A USER BY
router.post("/", async (req, res) => {
  const checkUser = await User.findOne({ user_name: req.body.user_name });
  const checkEmail = await User.findOne({ email: req.body.email });

  // User with the email already exists!
  if (checkUser || checkEmail) {
    res
      .status(400)
      .send("User Already Exists! Please change the email or username!");
  } else {
    try {
      const user = new User({
        user_type: req.body.user_type,
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        affiliation: req.body.affiliation,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      });
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err });
    }
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
