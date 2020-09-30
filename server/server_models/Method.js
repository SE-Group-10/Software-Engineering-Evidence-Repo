const mongoose = require("mongoose");

const MethodSchema = mongoose.Schema({
  method_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Methods", MethodSchema);
