import { useEffect, useState } from 'react';
import API from '../api/api';
import TaskCard from './TaskCard';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error.response.data.message);
    }
  };

  const createTask = async () => {
    try {
      const response = await API.post('/tasks', newTask);
      setTasks([...tasks, response.data.task]);
      setNewTask({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Failed to create task:', error.response.data.message);
    }
  };

  return (
    <div>
      <h2>My Tasks</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
      />
      <button onClick={createTask}>Create Task</button>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskManagement;
