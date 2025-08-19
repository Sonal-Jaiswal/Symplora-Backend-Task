import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert
} from '@mui/material';

// Helper function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const SubmitLeaveDialog = ({ open, onClose, onSubmitLeave, employees }) => {
  const [formData, setFormData] = useState({
    employee_id: '', 
    leave_type: '', 
    start_date: '', 
    end_date: '', 
    reason: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setError('');
      // Format dates to DD/MM/YYYY and capitalize leave type
      const formattedData = {
        ...formData,
        leave_type: formData.leave_type === 'annual' ? 'Annual' : 
                   formData.leave_type === 'sick' ? 'Sick' : 'Unpaid',
        start_date: formatDate(formData.start_date),
        end_date: formatDate(formData.end_date)
      };
      await onSubmitLeave(formattedData);
      setFormData({ employee_id: '', leave_type: '', start_date: '', end_date: '', reason: '' });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit leave request');
    }
  };

  const handleClose = () => {
    setFormData({ employee_id: '', leave_type: '', start_date: '', end_date: '', reason: '' });
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Leave Request</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Employee</InputLabel>
              <Select
                value={formData.employee_id}
                onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                label="Employee"
              >
                {employees.map((emp) => (
                  <MenuItem key={emp.id} value={emp.id}>
                    {emp.name} ({emp.department})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Leave Type</InputLabel>
              <Select
                value={formData.leave_type}
                onChange={(e) => setFormData({...formData, leave_type: e.target.value})}
                label="Leave Type"
              >
                <MenuItem value="annual">Annual Leave</MenuItem>
                <MenuItem value="sick">Sick Leave</MenuItem>
                <MenuItem value="unpaid">Unpaid Leave</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Date"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              required
              placeholder="Please provide a detailed reason for your leave request..."
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} size="large">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="large">
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitLeaveDialog;
