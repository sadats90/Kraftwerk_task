const Leave = require('../models/leaveModel');


exports.getAllLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find().populate('user', 'name email');
        res.json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getOwnLeaveRequests = async (req, res) => {
    try {
        const leaveRequests = await Leave.find({ user: req.user.id });
        res.json(leaveRequests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.applyForLeave = async (req, res) => {
    const { reason, startDate, endDate } = req.body;
    try {
        const leaveRequest = new Leave({ user: req.user.id, reason, startDate, endDate });
        await leaveRequest.save();
        res.status(201).json({ message: 'Leave request submitted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
