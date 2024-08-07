const express = require('express');
const router = express.Router();
const {
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
} = require('../controllers/controllers');

// Route to create a new student record
router.route('/create-student').post(createTask);

// Route to update an existing student record
router.route('/update-student').post(updateTask);

// Route to delete a student record by PRN
router.route('/delete-student/:prn').delete(deleteTask);

// Route to view a student record by PRN
router.route('/view-student/:prn').get(viewTask);

// Route to view all student records
router.route('/view-all-students').get(allTasks);

module.exports = router;
