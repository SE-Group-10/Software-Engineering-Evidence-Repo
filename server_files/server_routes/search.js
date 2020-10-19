const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");

// SEARCH FOR ARTICLE BASED ON SEARCH TYPE
router.get("/", async (req, res) => {
  let searchQuery = {
    stage: "approved",
    $and: [],
  };

  if (req.query.title) {
    searchQuery.$and.push({
      title: { $regex: `${req.query.title}`, $options: "i" },
    });
  }
  if (req.query.authors) {
    searchQuery.$and.push({
      authors: { $regex: `${req.query.authors}`, $options: "i" },
    });
  }
  if (req.query.article_link) {
    searchQuery.$and.push({
      article_link: { $regex: `${req.query.article_link}`, $options: "i" },
    });
  }
  if (req.query.publisher) {
    searchQuery.$and.push({
      publisher: { $regex: `${req.query.publisher}`, $options: "i" },
    });
  }

  if (req.query.min_date && req.query.max_date) {
    searchQuery.$and.push({
      publish_date: { $gte: req.query.min_date, $lte: req.query.max_date },
    });
  } else if (req.query.min_date) {
    searchQuery.$and.push({
      publish_date: { $gte: req.query.min_date },
    });
  } else if (req.query.max_date) {
    searchQuery.$and.push({
      publish_date: { $lte: req.query.max_date },
    });
  }

  if (req.query.methodology_name) {
    searchQuery.$and.push({
      methodologies: {
        $elemMatch: {
          methodology_name: {
            $regex: `${req.query.methodology_name}`,
            $options: "i",
          },
        },
      },
    });
  }
  if (req.query.method_name) {
    searchQuery.$and.push({
      methods: {
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
    searchQuery.$and.push({
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
    searchQuery.$and.push({
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
    await Article.find(searchQuery, (err, docs) => {
      if (!err) {
        res.json(docs);
      }
    });
    // res.json(resultArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
