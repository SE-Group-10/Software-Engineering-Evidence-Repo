const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");

// SEARCH FOR ARTICLE BASED ON SEARCH TYPE
router.get("/", async (req, res) => {
  let searchQuery = {
    $or: [],  
  };
  switch (req.query.search_type) {
    case "design":
      break;

    default:
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
      break;
  }
  try {
    const resultArticle = await Article.find(searchQuery);
    res.json(resultArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
