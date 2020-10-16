const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");
const Methodology = require("../server_models/Methodology");
const Method = require("../server_models/Method");

// GET ALL THE ARTICLES
router.get("/", async (req, res) => {
  if (req.query.stage) {
    try {
      const article = await Article.find({
        stage: req.query.stage,
        assigned_to: null,
      });
      res.json(article);
    } catch (err) {
      res.json({ message: err });
    }
  } else if (req.query.assigned_to) {
    try {
      const article = await Article.find({
        assigned_to: req.query.assigned_to,
      });
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

// GET SPECIFIC ARTICLE
router.get("/:article_id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.article_id);
    res.json(article);
  } catch (err) {
    res.json({ message: err });
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

// DELETE A SPECIFIC ARTICLE
router.delete("/:article_id", async (req, res) => {
  try {
    const removedArticle = await Article.remove({ _id: req.params.article_id });
    res.json(removedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// EDIT ARTICLE WITH UPDATED DATA
router.put("/:article_id", async (req, res) => {
  let putData = {
    title: "",
    document_type: [],
    authors: [],
    journals: [],
    publisher: "",
    volume: "",
    volume_number: "",
    start_page: "",
    end_page: "",
    publish_date: "",
    article_link: "",
    article_evidence_items: [],
    article_research_designs: [],
    evidence_history: [
      {
        editor_user_id: req.body.editor_user_id,
        from_stage: req.body.from_stage,
        to_stage: req.body.to_stage,
      },
    ],
    datetime_updated: Date.now(),
    assigned_to: null,
  };

  putData.title = req.body.title ? req.body.title : null;
  putData.document_type = req.body.document_type
    ? req.body.document_type
    : null;
  putData.authors = req.body.authors ? req.body.authors : null;
  putData.journals = req.body.journals ? req.body.journals : null;
  putData.publisher = req.body.publisher ? req.body.publisher : null;
  putData.volume = req.body.volume ? req.body.volume : null;
  putData.volume_number = req.body.volume_number ? req.body.volume_number : null;
  putData.start_page = req.body.start_page ? req.body.start_page : null;
  putData.end_page = req.body.end_page ? req.body.end_page : null;
  putData.publish_date = req.body.publish_date ? req.body.publish_date : null;
  putData.article_link = req.body.article_link ? req.body.article_link : null;
  putData.article_evidence_items = req.body.article_evidence_items
    ? req.body.article_evidence_items
    : null;
  putData.article_research_designs = req.body.article_research_designs
    ? req.body.article_research_designs
    : null;

  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.article_id },
      { $set: putData }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// HANDLE ARTICLE STAGES
router.patch("/:article_id", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.article_id },
      { $set: { stage: req.body.stage } }
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
