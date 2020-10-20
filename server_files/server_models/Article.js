const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  submitter_user_id: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
  },
  stage: {
    type: String,
    required: true,
  },
  document_type: [
    {
      type: String,
      required: true,
    },
  ],
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
  journals: [
    {
      type: String,
    },
  ],
  publisher: {
    type: String,
  },
  volume: {
    type: Number,
  },
  volume_number: {
    type: Number,
  },
  start_page: {
    type: Number,
  },
  end_page: {
    type: Number,
  },
  publish_date: {
    type: Date,
  },
  article_link: {
    type: String,
  },
  datetime_submitted: {
    type: Date,
    default: Date.now,
  },
  datetime_updated: {
    type: Date,
    default: Date.now,
  },
  ratings: [
    {
      user_id: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      datetime_rated: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  methodologies: [
    {
      methodology_name: {
        type: String,
        required: true,
      },
    },
  ],
  methods: [
    {
      method_name: {
        type: String,
        required: true,
      },
    },
  ],
  research_methods: [
    {
      research_method_name: {
        type: String,
        required: true,
      },
    },
  ],
  participants: [
    {
      participant_type: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Articles", ArticleSchema);
