const express = require("express");
const router = express.Router();
const Method = require("../server_models/Method");

// GET ALL THE METHODS
router.get("/", async (req, res) => {
  try {
    const methods = await Method.find();
    res.json(methods);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT A METHOD
router.post("/", async (req, res) => {
  const methods = new Method({
    method_name: req.body.method_name,
    description: req.body.description,
  });

  try {
    const savedMethods = await methods.save();
    res.json(savedMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC METHOD
router.get("/:method_id", async (req, res) => {
  try {
    const methods = await Method.findById(req.params.method_id);
    res.json(methods);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC METHOD
router.delete("/:method_id", async (req, res) => {
  try {
    const removedMethods = await Method.remove({ _id: req.params.method_id });
    res.json(removedMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC METHOD
router.patch("/:method_id", async (req, res) => {
  try {
    const updatedMethods = await Method.updateOne(
      { _id: req.params.method_id },
      {
        $set: {
          method_name: req.body.method_name,
          description: req.body.description,
        },
      }
    );
    res.json(updatedMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
