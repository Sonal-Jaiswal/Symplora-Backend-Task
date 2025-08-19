import { useState, useCallback } from 'react';

export const useLeaveStore = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const fetchLeaveRequests = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/leave-requests');
      const data = await response.json();
      setLeaveRequests(data.data || []);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      setLeaveRequests([]);
    }
  }, []);

  const submitLeave = useCallback(async (leaveData) => {
    const response = await fetch('http://localhost:3001/api/leave-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaveData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit leave request');
    }
    
    await fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  const updateLeaveStatus = useCallback(async (requestId, action) => {
    const response = await fetch(`http://localhost:3001/api/leave-requests/${requestId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: action === 'approve' ? 'Approved' : 'Rejected',
        comment: `${action}d via system`
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    await fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  return {
    leaveRequests,
    fetchLeaveRequests,
    submitLeave,
    updateLeaveStatus
  };
};
