const express = require("express");
const router = express.Router();
const ResearchParticipant = require("../server_models/ResearchParticipant");

// GET ALL THE RESEARCH PARTICIPANTS
router.get("/", async (req, res) => {
  try {
    const researchParticipant = await ResearchParticipant.find();
    res.json(researchParticipant);
  } catch (err) {
    res.json({ message: err });
  }
});

// SUBMIT A RESEARCH PARTICIPANT
router.post("/", async (req, res) => {
  const researchParticipant = new ResearchParticipant({
    participant_type: req.body.participant_type,
  });

  try {
    const savedResearchParticipant = await researchParticipant.save();
    res.json(savedResearchParticipant);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC RESEARCH PARTICIPANT
router.get("/:research_participant_id", async (req, res) => {
  try {
    const researchParticipant = await ResearchParticipant.findById(
      req.params.research_participant_id
    );
    res.json(researchParticipant);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC RESEARCH PARTICIPANT
router.delete("/:research_participant_id", async (req, res) => {
  try {
    const removedResearchParticipant = await ResearchParticipant.remove({
      _id: req.params.research_participant_id,
    });
    res.json(removedResearchParticipant);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC RESEARCH PARTICIPANT
router.patch("/:research_participant_id", async (req, res) => {
  try {
    const updatedResearchParticipant = await ResearchParticipant.updateOne(
      { _id: req.params.research_participant_id },
      { $set: { participant_type: req.body.participant_type } }
    );
    res.json(updatedResearchParticipant);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
