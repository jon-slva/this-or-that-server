const express = require('express');
const router = express.Router();
const { v4: uuid4 } = require('uuid');
const fs = require('fs');

// need data input here
const categoriesData = './data/categories.json'
const questionsData = './data/questions.json'


router.get('/questions/:questionId', (req, res) => {
    console.log()
})


router.get('/categories', (req, res) => {
    console.log()
})



router.post('/question', (req, res) => {
    console.log('new question post')


})

module.exports = router