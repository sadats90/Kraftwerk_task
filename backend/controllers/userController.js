const User = require('../models/userModel');


exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find({ role: 'Employee' }).select('-password');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getEmployeeData = async (req, res) => {
    try {
        const employee = await User.findById(req.user.id).select('-password');
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
