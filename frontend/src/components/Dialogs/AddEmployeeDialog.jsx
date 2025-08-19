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
  Alert,
  Typography
} from '@mui/material';

const AddEmployeeDialog = ({ open, onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    department: '', 
    joining_date: ''
  });
  const [error, setError] = useState('');

  const departments = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations'];

  const handleSubmit = async () => {
    try {
      setError('');
      
      // Validate required fields
      if (!formData.name || !formData.email || !formData.department || !formData.joining_date) {
        throw new Error('All fields are required');
      }

      await onAddEmployee(formData);
      setFormData({ name: '', email: '', department: '', joining_date: '' });
      onClose();
    } catch (err) {
      console.error('Error adding employee:', err);
      setError(err.message || 'Failed to add employee');
    }
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', department: '', joining_date: '' });
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5">Add New Employee</Typography>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              placeholder="e.g., Arjun Sharma"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              placeholder="e.g., arjun.sharma@symplora.com"
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Department</InputLabel>
              <Select
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                label="Department"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Joining Date"
              type="date"
              value={formData.joining_date}
              onChange={(e) => setFormData({...formData, joining_date: e.target.value})}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} size="large">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" size="large">
          Add Employee
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeDialog;
