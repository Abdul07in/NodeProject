const express = require('express');
const categories = require('./Routes/categories');
const students = require('./Routes/students');
const courses = require('./Routes/courses');
const mongoose = require('mongoose');

const app = express();

mongoose
    // .connect("mongodb://127.0.0.1/LearningPlatform")
    .connect("mongodb+srv://mongoroot:jWwshi3ajzTvTDCo@mongodbcustor.tnd8teq.mongodb.net/LearningPlatform")
    .then(() => {
        console.log("Connection is Successfull to Database");
    })
    .catch((err) => console.error("Error : ", err));

app.use(express.json())
app.use('/api/categories', categories);
app.use('/api/students', students);
app.use('/api/courses', courses);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port : ${port}`));
