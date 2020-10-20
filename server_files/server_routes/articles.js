const express = require("express");
const router = express.Router();
const Article = require("../server_models/Article");
const Methodology = require("../server_models/Methodology");
const Method = require("../server_models/Method");

// GET ALL THE ARTICLES
router.get("/", async (req, res) => {
  if (req.query.assigned_to) {
    try {
      const article = await Article.find({
        stage: req.query.stage,
        assigned_to: req.query.assigned_to,
      });
      res.json(article);
    } catch (err) {
      res.json({ message: err });
    }
  } else if (req.query.stage) {
    if (req.query.stage === "approved") {
      try {
        const article = await Article.find({
          stage: req.query.stage,
        });
        res.json(article);
      } catch (err) {
        res.json({ message: err });
      }
    } else {
      try {
        const article = await Article.find({
          stage: req.query.stage,
          assigned_to: null,
        });
        res.json(article);
      } catch (err) {
        res.json({ message: err });
      }
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
  let article = new Article({
    submitter_user_id: "",
    stage: "moderation",
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
    methodologies: [],
    methods: [],
    research_methods: [],
    participants: [],
  });

  article.submitter_user_id = req.body.submitter_user_id
    ? req.body.submitter_user_id
    : null;
  article.title = req.body.title ? req.body.title : null;
  article.document_type = req.body.document_type ? req.body.document_type : [];
  article.authors = req.body.authors ? req.body.authors : [];
  article.publisher = req.body.publisher ? req.body.publisher : null;
  article.journals = req.body.journals ? req.body.journals : [];
  article.volume = req.body.volume ? parseInt(req.body.volume) : null;
  article.volume_number = req.body.volume_number
    ? parseInt(req.body.volume_number)
    : null;
  article.start_page = req.body.start_page
    ? parseInt(req.body.start_page)
    : null;
  article.end_page = req.body.end_page ? parseInt(req.body.end_page) : null;
  article.publish_date = req.body.publish_date ? req.body.publish_date : null;
  article.article_link = req.body.article_link ? req.body.article_link : null;
  article.methodologies = req.body.methodologies
    ? req.body.methodologies
    : null;
  article.research_methods = req.body.research_methods
    ? req.body.research_methods
    : null;
  article.methods = req.body.methods ? req.body.methods : null;
  article.participants = req.body.participants ? req.body.participants : null;

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
    methodologies: [],
    methods: [],
    research_methods: [],
    participants: [],
    datetime_updated: Date.now(),
  };

  if (req.body.stage) {
    putData.stage = req.body.stage;
  }
  putData.title = req.body.title ? req.body.title : null;
  putData.document_type = req.body.document_type ? req.body.document_type : [];
  putData.authors = req.body.authors ? req.body.authors : [];
  putData.journals = req.body.journals ? req.body.journals : [];
  putData.publisher = req.body.publisher ? req.body.publisher : null;
  putData.volume = req.body.volume ? parseInt(req.body.volume) : null;
  putData.volume_number = req.body.volume_number
    ? parseInt(req.body.volume_number)
    : null;
  putData.start_page = req.body.start_page
    ? parseInt(req.body.start_page)
    : null;
  putData.end_page = req.body.end_page ? parseInt(req.body.end_page) : null;
  putData.publish_date = req.body.publish_date ? req.body.publish_date : null;
  putData.article_link = req.body.article_link ? req.body.article_link : null;
  putData.methodologies = req.body.methodologies
    ? req.body.methodologies
    : null;
  putData.research_methods = req.body.research_methods
    ? req.body.research_methods
    : null;
  putData.methods = req.body.methods ? req.body.methods : null;
  putData.participants = req.body.participants ? req.body.participants : null;

  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: req.params.article_id },
      { $set: putData },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      () => {}
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

// HANDLE ARTICLE STAGES
router.patch("/:article_id", async (req, res) => {
  let patchData = {};
  if (req.body.assigned_to) {
    patchData = {
      assigned_to: req.body.assigned_to,
      datetime_updated: Date.now(),
    };
  } else {
    patchData = {
      stage: req.body.stage,
      datetime_updated: Date.now(),
    };
  }
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.article_id },
      { $set: patchData },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      () => {}
    );
    res.json(updatedArticle);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
