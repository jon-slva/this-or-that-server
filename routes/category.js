const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// Data Paths
const questionsFilePath = "./data/questions.json";
const categoryFilePath = "./data/categories.json";

router.get("/", (req, res) => {
  const categoryData = fs.readFileSync(categoryFilePath);
  res.status(200).send(categoryData);
});

router.get("/:categoryId/questions", (req, res) => {
  const questionDataJson = fs.readFileSync(questionsFilePath);
  const { categoryId } = req.params;
  const questionData = JSON.parse(questionDataJson);
  const categoryQuestions = questionData.filter(
    (question) => question.categoryId === categoryId
  );
  res.status(200).json(categoryQuestions);
});

router.post("/:categoryId/questions", (req, res) => {
  const questionDataJson = fs.readFileSync(questionsFilePath);
  const { user, question } = req.body;
  const { categoryId } = req.params;

  //Formatting Incoming Questions
  const newQuestion = {
    categoryId,
    id: uuidv4(),
    user,
    question,
    timestamp: Date.now(),
    upvotes: 0,
    affirmative: [],
    negative: [],
  };

  const newQuestionData = [...JSON.parse(questionDataJson), newQuestion];

  fs.writeFileSync(questionsFilePath, JSON.stringify(newQuestionData));

  const categoryQuestions = newQuestionData.filter(
    (question) => question.categoryId === categoryId
  );
  res.status(201).json(categoryQuestions);
});

module.exports = router;
