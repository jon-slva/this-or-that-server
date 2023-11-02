const express = require('express');
const router = express.Router();
const { v4: uuid4 } = require('uuid');
const fs = require('fs');

// need data input here
const questionsFilePath = './data/questions.json';

// router.post('/', (req, res) => {
//     // console.log("Categories and questions POST");
//     const questionData = fs.readFileSync(questionsFilePath)
//     const {categoryId, user, question} = req.body;
    
//     //Formatting Incoming Questions
//     const newQuestion = { //re-wraite this for later
//         categoryId, 
//         "questionId": uuidv4(),
//         user,
//         question,
//         "timestamp": Date.now(),
//         "upvotes": 0,
//         "affirmative": [],
//         "negative": []
//     }

//     const newQuestionData = [ ...JSON.parse(questionData), newQuestion ];

//     // fs.writeFileSync(questionsFilePath, JSON.stringify(newQuestionData))
//     res.status(201).send(newQuestion);
// })

router.get('/:questionId', (req, res) => {
    const {questionId} = req.params;
    const questionDataJson = fs.readFileSync(questionsFilePath);
    const questionData = JSON.parse(questionDataJson);
    const question = questionData.find(({id}) => id === questionId);
    res.status(200).json(question);
});


router.put('/:questionId/upvote', (req, res) => {
    const {questionId} = req.params;
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);

    const question = questions.find((question) => question.id === questionId);
    question.upvotes++;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question)
});

router.put('/:questionId/downvote', (req, res) => {
    const {questionId} = req.params;
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    question.upvotes--;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question)
});

router.post("/:questionId/comments", (req, res) => {
    res.status(201);
});

router.put("/:questionId/comments/:commentId/upvote", (req, res) => {
    res.send(200);
});

router.put("/:questionId/comments/:commentId/downvote", (req, res) => {
    res.send(200);
});


module.exports = router