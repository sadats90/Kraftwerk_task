const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin, isEmployee } = require('../middlewares/roleMiddleware');
const { getAllEmployees, getEmployeeData } = require('../controllers/userController');
const router = express.Router();

// Admin/HR: Get all employees
router.get('/employees', protect, isAdmin, getAllEmployees);

// Employee: Get own data
router.get('/me', protect, isEmployee, getEmployeeData);

module.exports = router;
