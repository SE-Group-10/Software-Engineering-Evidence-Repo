const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");

// SEARCH FOR ARTICLE BASED ON SEARCH TYPE
router.get("/", async (req, res) => {
  let searchQuery = {
    $or: [],
  };
  if (req.query.title) {
    searchQuery.$or.push({
      title: { $regex: `${req.query.title}`, $options: "i" },
    });
  }
  if (req.query.document_type) {
    searchQuery.$or.push({
      document_type: {
        $regex: `${req.query.document_type}`,
        options: "i",
      },
    });
  }
  if (req.query.authors) {
    searchQuery.$or.push({
      authors: { $regex: `${req.query.authors}`, $options: "i" },
    });
  }
  if (req.query.publisher) {
    searchQuery.$or.push({
      publisher: { $regex: `${req.query.publisher}`, $options: "i" },
    });
  }
  if (req.query.min_date && req.query.max_date) {
    searchQuery.$or.push({
      publish_date: { $gte: req.query.min_date, $lte: req.query.max_date },
    });
  }
  if (req.query.methodology_name) {
    searchQuery.$or.push({
      methodology: {
        $elemMatch: {
          methodology_name: {
            $regex: `${req.query.methodology_name}`,
            $options: "i",
          },
        },
      },
    });
  }
  if (req.query.method) {
    searchQuery.$or.push({
      research_methods: {
        $elemMatch: {
          method_name: {
            $regex: `${req.query.method_name}`,
            $options: "i",
          },
        },
      },
    });
  }
  if (req.query.research_method_name) {
    searchQuery.$or.push({
      research_methods: {
        $elemMatch: {
          research_method_name: {
            $regex: `${req.query.research_method_name}`,
            $options: "i",
          },
        },
      },
    });
  }
  if (req.query.participant_type) {
    searchQuery.$or.push({
      participants: {
        $elemMatch: {
          participant_type: {
            $regex: `${req.query.participant_type}`,
            $options: "i",
          },
        },
      },
    });
  }

  try {
    const resultArticle = await Article.find(searchQuery);
    res.json(resultArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
