const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
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

router.post("/:questionId/affirmative", (req, res) => {
    const {questionId} = req.params;
    const { user, answer } = req.body;

    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const newComment = {
        id: uuidv4(),
        upvotes: 0,
        user,
        answer,
        timestamp: Date.now(),
    }
    question.affirmative.push(newComment);
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(201).json(question);
});

router.put("/:questionId/affirmative/:commentId/upvote", (req, res) => {
    const { questionId, commentId } = req.params;
    
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const comment = question.affirmative.find((comment) => comment.id === commentId);
    comment.upvotes++;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question);
});

router.put("/:questionId/affirmative/:commentId/downvote", (req, res) => {
    const { questionId, commentId } = req.params;
    
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const comment = question.affirmative.find((comment) => comment.id === commentId);
    comment.upvotes--;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question);
});

router.post("/:questionId/negative", (req, res) => {
    const {questionId} = req.params;
    const { user, answer } = req.body;

    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const newComment = {
        id: uuidv4(),
        upvotes: 0,
        user,
        answer,
        timestamp: Date.now(),
    }
    question.negative.push(newComment);
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(201).json(question);
});

router.put("/:questionId/negative/:commentId/upvote", (req, res) => {
    const { questionId, commentId } = req.params;
    
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const comment = question.negative.find((comment) => comment.id === commentId);
    comment.upvotes++;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question);
});

router.put("/:questionId/negative/:commentId/downvote", (req, res) => {
    const { questionId, commentId } = req.params;
    
    const questionsJson = fs.readFileSync(questionsFilePath);
    const questions = JSON.parse(questionsJson);
    
    const question = questions.find((question) => question.id === questionId);
    const comment = question.negative.find((comment) => comment.id === commentId);
    comment.upvotes--;
    // fs.writeFileSync(questionsFilePath, JSON.stringify(questions))
    res.status(200).json(question);
});


module.exports = router