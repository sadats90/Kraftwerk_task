import { useContext } from 'react';
import CheckInCheckOut from '../components/CheckInCheckOut.jsx';
import LeaveRequests from '../components/LeaveRequests.jsx';
import TaskManagement from '../components/TaskManagement.jsx';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <CheckInCheckOut />
      <LeaveRequests />
      <TaskManagement />
    </div>
  );
};

export default Dashboard;
