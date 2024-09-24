exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'Admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};


exports.isEmployee = (req, res, next) => {
    if (req.user.role === 'Employee') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Employees only.' });
    }
};
