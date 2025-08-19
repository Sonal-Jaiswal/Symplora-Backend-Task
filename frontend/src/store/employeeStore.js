import { useState, useCallback } from 'react';

export const useEmployeeStore = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      const data = await response.json();
      setEmployees(data.data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  }, []);

  const addEmployee = useCallback(async (employeeData) => {
    const response = await fetch('http://localhost:3001/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(employeeData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to add employee');
    }
    
    await fetchEmployees();
  }, [fetchEmployees]);

  const loadDemoData = useCallback(async () => {
    const response = await fetch('http://localhost:3001/api/quick-setup');
    if (!response.ok) {
      throw new Error('Failed to load demo data');
    }
  }, []);

  return {
    employees,
    fetchEmployees,
    addEmployee,
    loadDemoData
  };
};
