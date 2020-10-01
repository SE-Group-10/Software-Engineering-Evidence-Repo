const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");

// SEARCH FOR ARTICLE BASED ON SEARCH TYPE
router.get("/", async (req, res) => {
  let searchQuery = {
    $or: [],
  };
  switch (req.body.search_type) {
    case "design":
      break;

    default:
      if (req.body.title) {
        searchQuery.$or.push({
          title: { $regex: `${req.body.title}`, $options: "i" },
        });
      }
      if (req.body.document_type) {
        searchQuery.$or.push({
          document_type: {
            $regex: `${req.body.document_type}`,
            options: "i",
          },
        });
      }
      if (req.body.authors) {
        searchQuery.$or.push({
          authors: { $regex: `${req.body.authors}`, $options: "i" },
        });
      }
      if (req.body.publisher) {
        searchQuery.$or.push({
          publisher: { $regex: `${req.body.publisher}`, $options: "i" },
        });
      }
      if (req.body.min_date && req.body.max_date) {
        searchQuery.$or.push({
          publish_date: { $gte: req.body.min_date, $lte: req.body.max_date },
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
