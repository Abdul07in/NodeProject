const express = require("express");
const { Student, validate } = require('../models/studentModel')
const router = express.Router();

router.get("/", async (req, res) => {
    let students = await Student.find();
    res.send(students);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    try {
        const student = new Student({
            name: req.body.name,
            isEnrolled: req.body.isEnrolled,
            phone: req.body.phone,
        });
        await student.save();
        res.send(student);
    } catch (error) {
        return res.status(400).send("Error");
    }
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isEnrolled: req.body.isEnrolled
        },
        { new: true }
    );
    if (!student)
        return res.status(404).send("The student with the given id was not found");
    res.send(student);
});

router.delete("/:id", async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student)
        return res.status(404).send("The student with the given id was not found");
    res.send(student);
});

router.get("/:id", async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student)
        return res.status(404).send("The student with the given id was not found");
    res.send(student);
});


module.exports = router;
