const mongoose = require("mongoose");

const ResearchMethodSchema = mongoose.Schema({
  research_method_name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Research_Methods", ResearchMethodSchema);
