const Task = require('../models/taskModel');


exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getOwnTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.createTask = async (req, res) => {
    const { title, description, dueDate, assignedTo } = req.body;

   
    const isEmployee = req.user.role === 'Employee';
    const taskData = {
        title,
        description,
        dueDate,
        assignedTo: isEmployee ? req.user.id : assignedTo, 
        status: isEmployee ? 'In Progress' : 'To Do'       
    };

    try {
        const task = new Task(taskData);
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updateTaskStatus = async (req, res) => {
    const { status } = req.body;
    const { taskId } = req.params;

 
    if (!['To Do', 'In Progress', 'Done'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    try {
        let task;

      
        if (req.user.role === 'Admin' || req.user.role === 'HR') {
            task = await Task.findById(taskId);
        } else {
           
            task = await Task.findOne({ _id: taskId, assignedTo: req.user.id });
        }

        if (!task) {
            return res.status(404).json({ message: 'Task not found or not authorized' });
        }

        task.status = status;
        await task.save();
        res.json({ message: 'Task status updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
       
        if (req.user.role !== 'Admin' && req.user.role !== 'HR') {
            return res.status(403).json({ message: 'Not authorized to delete tasks' });
        }

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
