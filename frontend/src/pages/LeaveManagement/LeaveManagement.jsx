import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Add as AddIcon,
  RequestPage as RequestPageIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import SubmitLeaveDialog from '../../components/Dialogs/SubmitLeaveDialog';

// Helper function to format date to DD/MM/YYYY
const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const LeaveManagement = ({ employees, leaveRequests, onSubmitLeave, onApproveReject }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Leave Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and manage leave requests
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          size="large"
        >
          Submit Leave Request
        </Button>
      </Box>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Period</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <RequestPageIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                    <Typography color="text.secondary">No leave requests found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                leaveRequests.map((request) => (
                  <TableRow key={request.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {request.employee_name?.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {request.employee_name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={request.leave_type} color="primary" variant="outlined" size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {request.start_date} to {request.end_date}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {request.days_requested} day{request.days_requested !== 1 ? 's' : ''}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status} 
                        color={
                          request.status === 'Approved' ? 'success' :
                          request.status === 'Rejected' ? 'error' :
                          request.status === 'Pending' ? 'warning' : 'default'
                        } 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="center">
                      {request.status?.toLowerCase() === 'pending' && (
                        <Box>
                          <Tooltip title="Approve">
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => onApproveReject(request.id, 'approve')}
                              sx={{ mr: 1 }}
                            >
                              <CheckIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => onApproveReject(request.id, 'reject')}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Submit Leave Dialog */}
      <SubmitLeaveDialog 
        open={open} 
        onClose={() => setOpen(false)} 
        onSubmitLeave={onSubmitLeave}
        employees={employees}
      />
    </Box>
  );
};

export default LeaveManagement;
