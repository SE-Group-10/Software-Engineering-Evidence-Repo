const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");
const Methodology = require("../server_models/Methodology");
const Method = require("../server_models/Method");

// GET ALL THE ARTICLES
router.get("/", async (req, res) => {
  if (req.query.stage) {
    try {
      const article = await Article.find({ stage: req.query.stage });
      res.json(article);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    try {
      const article = await Article.find();
      res.json(article);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

// SUBMIT AN ARTICLE
router.post("/", async (req, res) => {
  const article = new Article({
    submitter_user_id: req.body.user_id,
    stage: "moderation",
    document_type: req.body.document_type,
    title: req.body.title,
    authors: req.body.authors,
    publisher: req.body.publisher,
    journals: req.body.journals,
    volume: req.body.volume,
    volume_number: req.body.volume_number,
    start_page: req.body.start_page,
    end_page: req.body.end_page,
    article_link: req.body.article_link,
  });

  if (req.body.publish_year && req.body.publish_month) {
    article.publish_date = new Date(
      req.body.publish_year,
      req.body.publish_month
    );
  } else if (req.body.publish_year && !req.body.publish_month) {
    article.publish_date = new Date(req.body.publish_year, 0);
  }

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
