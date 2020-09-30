const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
  submitter_user_id: {
    type: String,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  document_type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
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
  publish_year: {
    type: Number,
    required: true,
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
  ratings: new mongoose.Schema({
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
  }),
  evidence_history: new mongoose.Schema({
    editor_user_id: {
      type: String,
      required: true,
    },
    from_stage: {
      type: String,
      required: true,
    },
    to_stage: {
      type: String,
      required: true,
    },
    datetime_edited: {
      type: Date,
      default: Date.now,
    },
  }),
  article_evidence_items: new mongoose.Schema({
    methodology: {
      methodology_id: {
        type: String,
        required: true,
      },
      methodology_name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    method: {
      method_id: {
        type: String,
        required: true,
      },
      method_name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    outcome: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
  }),
  article_research_design: new mongoose.Schema({
    research_methods: [
      {
        methodology_id: {
          type: String,
          required: true,
        },
        methodology_name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    participants: [
      {
        participant_id: {
          type: String,
          required: true,
        },
        participant_type: {
          type: String,
          required: true,
        },
      },
    ],
  }),
});

module.exports = mongoose.model("Articles", ArticleSchema);
