const mongoose = require("mongoose");

const ResearchParticipantSchema = mongoose.Schema({
  participant_type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Research_Participants", ResearchParticipantSchema);
