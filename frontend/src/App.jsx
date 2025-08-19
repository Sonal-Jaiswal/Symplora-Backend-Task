import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Snackbar, Alert } from '@mui/material';

import { theme } from './theme/theme';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeManagement from './pages/EmployeeManagement/EmployeeManagement';
import LeaveManagement from './pages/LeaveManagement/LeaveManagement';
import Analytics from './pages/Analytics/Analytics';
import { useEmployeeStore } from './store/employeeStore';
import { useLeaveStore } from './store/leaveStore';

function App() {
  const { 
    employees, 
    fetchEmployees, 
    addEmployee, 
    loadDemoData 
  } = useEmployeeStore();
  
  const { 
    leaveRequests, 
    fetchLeaveRequests, 
    submitLeave, 
    updateLeaveStatus 
  } = useLeaveStore();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Load initial data
  useEffect(() => {
    fetchEmployees();
    fetchLeaveRequests();
  }, []);

  const handleLoadDemo = async () => {
    try {
      await loadDemoData();
      setSnackbar({ open: true, message: 'Indian demo data loaded successfully!', severity: 'success' });
      await fetchEmployees();
      await fetchLeaveRequests();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error loading demo data', severity: 'error' });
    }
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      await addEmployee(employeeData);
      setSnackbar({ open: true, message: 'Employee added successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Failed to add employee', severity: 'error' });
    }
  };

  const handleSubmitLeave = async (leaveData) => {
    try {
      await submitLeave(leaveData);
      setSnackbar({ open: true, message: 'Leave request submitted successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Failed to submit leave request', severity: 'error' });
    }
  };

  const handleApproveReject = async (requestId, action) => {
    try {
      await updateLeaveStatus(requestId, action);
      setSnackbar({ 
        open: true, 
        message: `Leave request ${action}d successfully!`, 
        severity: action === 'approve' ? 'success' : 'info' 
      });
    } catch (error) {
      setSnackbar({ open: true, message: error.message || 'Failed to update status', severity: 'error' });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout onLoadDemo={handleLoadDemo}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <Dashboard 
                  employees={employees} 
                  leaveRequests={leaveRequests} 
                  onLoadDemo={handleLoadDemo}
                />
              } 
            />
            <Route 
              path="/employees" 
              element={
                <EmployeeManagement 
                  employees={employees} 
                  onAddEmployee={handleAddEmployee}
                  onLoadDemo={handleLoadDemo}
                />
              } 
            />
            <Route 
              path="/leave-requests" 
              element={
                <LeaveManagement 
                  employees={employees}
                  leaveRequests={leaveRequests}
                  onSubmitLeave={handleSubmitLeave}
                  onApproveReject={handleApproveReject}
                />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <Analytics 
                  employees={employees} 
                  leaveRequests={leaveRequests} 
                />
              } 
            />
          </Routes>
        </Layout>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Router>
    </ThemeProvider>
  );
}

export default App;
