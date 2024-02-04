const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require('../models/categoryModel')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlenght: 255,
    },
    category: {
        type: categorySchema,
        required: true
    },
    creator: { type: String, required: true },
    rating: { type: Number, required: true },
});

const Course = mongoose.model("Course", courseSchema);

function validateData(course) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        creator: Joi.string().min(5).max(255).required(),
        categoryId: Joi.string(),
        rating: Joi.number().min(0).required(),
    };
    return Joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateData;
