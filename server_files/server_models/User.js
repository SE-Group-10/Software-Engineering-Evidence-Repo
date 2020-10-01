const mongoose = require("mongoose");

const SavedSearchSchema = new mongoose.Schema({
  search_name: { type: String, required: true },
  search_string: {
    type: String,
    required: true,
  },
  datetime_saved: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = mongoose.Schema({
  user_type: {
    type: String,
    required: true,
    default: "user",
  },
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  affiliation: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  saved_searches: [SavedSearchSchema],
  datetime_created: {
    type: Date,
    default: Date.now,
  },
  datetime_updated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);
