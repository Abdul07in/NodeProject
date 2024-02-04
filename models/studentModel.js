const mongoose = require("mongoose");
const Joi = require("joi");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlenght: 100 },
    isEnrolled: { type: Boolean, default: false },
    phone: { type: String, required: true, minlength: 10, maxlenght: 25 },
});

const Student = mongoose.model("Student", studentSchema);

function validateData(student) {
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        phone: Joi.string().min(10).max(50).required(),
        isEnrolled: Joi.boolean(),
    };
    return Joi.validate(student, schema);
}

exports.Student = Student;
exports.validate = validateData;
