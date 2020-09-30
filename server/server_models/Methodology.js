const mongoose = require("mongoose");

const MethodologySchema = mongoose.Schema({
  methodology_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Methodologies", MethodologySchema);
