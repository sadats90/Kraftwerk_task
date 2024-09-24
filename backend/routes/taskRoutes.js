const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin, isEmployee } = require('../middlewares/roleMiddleware');
const { 
    getAllTasks, 
    getOwnTasks, 
    createTask, 
    updateTaskStatus, 
    deleteTask 
} = require('../controllers/taskController');

const router = express.Router();

// POST: Create a new task (Employee/Admin/HR)
router.post('/', protect, createTask);

// GET: Get all tasks (Admin/HR) or employee-specific tasks (Employee)
router.get('/', protect, (req, res) => {
    if (req.user.role === 'Admin' || req.user.role === 'HR') {
        getAllTasks(req, res);
    } else {
        getOwnTasks(req, res);
    }
});

// PATCH: Update task status (Employee/Admin/HR)
router.patch('/:taskId', protect, updateTaskStatus);

// DELETE: Remove tasks (Admin/HR)
router.delete('/:taskId', protect, isAdmin, deleteTask);

module.exports = router;
