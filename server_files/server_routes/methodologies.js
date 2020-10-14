const express = require("express");
const router = express.Router();
const Methodology = require("../server_models/Methodology");

// GET ALL THE METHODOLOGIES
router.get("/", async (req, res) => {
  try {
    const methodologies = await Methodology.find();
    res.json(methodologies);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT A METHODOLOGY
router.post("/", async (req, res) => {
  const methodologies = new Methodology({
    methodology_name: req.body.methodology_name,
    description: req.body.description,
  });

  try {
    const savedMethodologies = await methodologies.save();
    res.json(savedMethodologies);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC METHODOLOGY
router.get("/:methodology_id", async (req, res) => {
  try {
    const methodologies = await Methodology.findById(req.params.methodology_id);
    res.json(methodologies);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC METHODOLOGY
router.delete("/:methodology_id", async (req, res) => {
  try {
    const removedMethodologies = await Methodology.remove({
      _id: req.params.methodology_id,
    });
    res.json(removedMethodologies);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC METHODOLOGY
router.patch("/:methodology_id", async (req, res) => {
  try {
    const updatedMethodologies = await Methodology.updateOne(
      { _id: req.params.methodology_id },
      {
        $set: {
          methodology_name: req.body.methodology_name,
          description: req.body.description,
        },
      }
    );
    res.json(updatedMethodologies);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
