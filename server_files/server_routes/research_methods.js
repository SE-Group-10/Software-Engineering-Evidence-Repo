const express = require("express");
const router = express.Router();
const ResearchMethods = require("../server_models/ResearchMethods");

// GET ALL THE RESEARCH METHODS
router.get("/", async (req, res) => {
  try {
    const researchMethods = await ResearchMethods.find();
    res.json(researchMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT A RESEARCH METHOD
router.post("/", async (req, res) => {
  const researchMethods = new ResearchMethods({
    research_method_name: req.body.research_method_name,
  });

  try {
    const savedResearchMethods = await researchMethods.save();
    res.json(savedResearchMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC RESEARCH METHOD
router.get("/:research_method_id", async (req, res) => {
  try {
    const researchMethods = await ResearchMethods.findById(
      req.params.research_method_id
    );
    res.json(researchMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC RESEARCH METHOD
router.delete("/:research_method_id", async (req, res) => {
  try {
    const removedResearchMethods = await ResearchMethods.remove({
      _id: req.params.research_method_id,
    });
    res.json(removedResearchMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC RESEARCH METHOD
router.patch("/:research_method_id", async (req, res) => {
  try {
    const updatedResearchMethods = await ResearchMethods.updateOne(
      { _id: req.params.research_method_id },
      { $set: { research_method_name: req.body.research_method_name } }
    );
    res.json(updatedResearchMethods);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
