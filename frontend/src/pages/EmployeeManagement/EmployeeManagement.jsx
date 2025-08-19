import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Avatar,
  Chip,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  People as PeopleIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import AddEmployeeDialog from '../../components/Dialogs/AddEmployeeDialog';

const EmployeeManagement = ({ employees, onAddEmployee, onLoadDemo }) => {
  const [open, setOpen] = useState(false);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Employee Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your team members and their information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          size="large"
        >
          Add Employee
        </Button>
      </Box>

      {employees.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <PeopleIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
            <Typography variant="h5" gutterBottom color="text.secondary">
              No employees found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Add your first employee or load demo data to get started
            </Typography>
            <Button variant="contained" onClick={onLoadDemo} size="large">
              Load Indian Demo Data
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {employees.map((employee) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        width: 56, 
                        height: 56, 
                        mr: 2,
                        fontSize: '1.2rem'
                      }}
                    >
                      {getInitials(employee.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {employee.name}
                      </Typography>
                      <Chip 
                        label={employee.department} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {employee.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Joined {new Date(employee.joining_date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="success.main">
                        {employee.annual_leave_balance}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Annual Leave
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="warning.main">
                        {employee.sick_leave_balance}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Sick Leave
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add Employee Dialog */}
      <AddEmployeeDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onAddEmployee={onAddEmployee}
      />
    </Box>
  );
};

export default EmployeeManagement;
