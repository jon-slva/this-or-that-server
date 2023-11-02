const express = require('express');
const router = express.Router();
const questionsRoutes = require("./routes/questions")

const app = express();

// need data input here
const categoriesData = './data/categories.json'

console.log(questionsRoutes)

router.get('/categories', (req, res) => {
    console.log("Categories Endpoint");
    res.status(200).send(categoriesData)
});

app.listen(8080, () => {
    console.log('listening on port 8080')
})