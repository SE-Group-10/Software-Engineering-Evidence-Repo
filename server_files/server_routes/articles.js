const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");
const Methodology = require("../server_models/Methodology");
const Method = require("../server_models/Method");

// GET ALL THE ARTICLES
router.get("/", async (req, res) => {
  try {
    const article = await Article.find();
    res.json(article);
  } catch (err) {
    res.json({ message: err });
  }
  res.send("We are on articles");
});

// SUBMIT AN ARTICLE
router.post("/", async (req, res) => {
  const methodology = await Methodology.findOne(req.body.methodology_id);
  const method = await Method.findById(req.body.methodology_id);

  const article = new Article({
    stage: "moderation",
    document_type: req.body.document_type,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    volume: req.body.volume,
    volume_number: req.body.volume_number,
    start_page: req.body.start_page,
    end_page: req.body.end_page,
    publish_year: req.body.publish_year,
    article_link: req.body.article_link,
    datetime_updated: Date.now,
  });

  try {
    const savedArticle = await article.save();
    res.json(savedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET ALL ARTICLES IN A SPECIFIC STAGE
router.get("/stages/:stage", async (req, res) => {
  try {
    const articleByStage = await Article.find({ stage: res.params.stage });
    res.json(articleByStage);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET SPECIFIC ARTICLE
router.get("/:article_id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);
    res.json(article);
  } catch (err) {
    res.json({ message: err });
  }
});

// SEARCH FOR ARTICLE BASED ON SEARCH TYPE
router.get("/search_article/:search_type", async (req, res) => {
  let searchQuery = {};

  switch (req.params.search_type) {
    case "design":
      break;

    default:
      searchQuery = {
        title: { $regex: `%${req.body.title}%`, options: "i" },
      };
      break;
  }
  try {
    const updatedArticle = await Article.find(searchQuery);
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE A SPECIFIC ARTICLE
router.delete("/:article_id", async (req, res) => {
  try {
    const removedArticle = await Article.remove({ _id: req.params.article_id });
    res.json(removedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE A SPECIFIC ARTICLE
router.patch("/:article_id", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.article_id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
