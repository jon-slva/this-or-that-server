const express = require('express');
const cors = require("cors");
// Routes
const questionsRoutes = require("./routes/questions")
const categoryRoutes = require("./routes/category")

const app = express();
app.use(express.json());
app.use(cors());

app.use("/categories", categoryRoutes);
app.use("/questions", questionsRoutes);


app.listen(8080, () => {
    console.log('listening on port 8080')
})