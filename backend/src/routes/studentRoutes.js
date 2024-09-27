const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Save student phone number
router.post('/', async (req, res) => {
  try {
    const {name, phoneNumber } = req.body;
    const student = new Student({ name, phoneNumber });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;