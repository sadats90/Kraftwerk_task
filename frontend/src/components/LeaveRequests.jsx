import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch existing leave requests for the logged-in user
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get('/api/leaves'); // Adjust the API endpoint if necessary
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  // Submit a new leave request
  const submitLeaveRequest = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/leaves', {
        startDate,
        endDate,
        reason,
      });
      setStatusMessage(response.data.message);
      fetchLeaveRequests(); // Refresh the leave requests list
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setStatusMessage('Failed to submit leave request.');
    }

    // Clear input fields after submission
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="leave-request-container">
      <h2>Leave Requests</h2>
      <form onSubmit={submitLeaveRequest}>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Leave Request</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
      
      <h3>Your Leave Requests</h3>
      <ul>
        {leaveRequests.map((request) => (
          <li key={request._id}>
            <strong>From:</strong> {new Date(request.startDate).toLocaleDateString()} - 
            <strong>To:</strong> {new Date(request.endDate).toLocaleDateString()} - 
            <strong>Reason:</strong> {request.reason} - 
            <strong>Status:</strong> {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequest;
