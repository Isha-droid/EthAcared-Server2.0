const express = require('express');
const router = express.Router();
const {
    createStudent,
    updateStudent,
    deleteStudent,
    viewStudent,
    allStudents
} = require('../controllers/controllers');

// Route to create a new student record
router.route('/create-student').post(createStudent);

// Route to update an existing student record
router.route('/update-student').post(updateStudent);

// Route to delete a student record by PRN
router.route('/delete-student/:prn').delete(deleteStudent);

// Route to view a student record by PRN
router.route('/view-student/:prn').get(viewStudent);

// Route to view all student records
router.route('/view-all-students').get(allStudents);

module.exports = router;
