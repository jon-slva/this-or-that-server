const express = require('express');
const router = express.Router();
const { v4: uuid4 } = require('uuid');
const fs = require('fs');

// Data Paths
const questionsData = './data/questions.json'

//Formatting Incoming Questions
const newQuestion = { //re-wraite this for later
    "categoryId": 1,
    "questionId": uuidv4(),
    user,
    question,
    "timestamp": 1634283600,
    "upvotes": 0,
    "affirmative": [],
    "negative": []
}

router.get('/category/:categoryId/questions', (req, res) => {
    console.log("Categories and questions GET");
    res.status(200).send(questionsData);
})

router.post('/category/:categoryId/questions', (req, res) => {
    console.log("Categories and questions POST");

    const newQuestionData = fsreadFileSync(questionsData)
    
    res.status(200).send(questionsData);
})


