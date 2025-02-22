const express = require('express');
const studentControllers = require('../controllers/student.controller'); // Ensure correct file path

const router = express.Router();

router.post('/admission', studentControllers.createStudent); // Fix: Call the function correctly
router.get('/students', studentControllers.getAllStudents);
router.get('/students/:id', studentControllers.getStudentById);
router.put('/students/:id', studentControllers.updateStudent);
router.delete('/students/:id', studentControllers.deleteStudent);

module.exports = router;
