const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin, isEmployee } = require('../middlewares/roleMiddleware');
const { getAllLeaveRequests, getOwnLeaveRequests, applyForLeave } = require('../controllers/leaveController');
const router = express.Router();

// Admin/HR: Get all leave requests
router.get('/', protect, isAdmin, getAllLeaveRequests);

// Employee: Get own leave requests
router.get('/my-leaves', protect, isEmployee, getOwnLeaveRequests);

// Employee: Apply for leave
router.post('/apply', protect, isEmployee, applyForLeave);

module.exports = router;
