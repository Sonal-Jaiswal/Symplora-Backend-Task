# Frontend Source Code Structure

This directory contains the organized React components and pages for the Symplora Leave Management System.

## Folder Structure

```
src/
├── components/           # Reusable UI components
│   ├── Dialogs/         # Dialog/modal components
│   │   ├── AddEmployeeDialog.jsx
│   │   └── SubmitLeaveDialog.jsx
│   ├── Layout/          # Layout and navigation components
│   │   └── Layout.jsx
│   └── index.js         # Component exports
├── pages/               # Page-level components
│   ├── Dashboard/       # Dashboard page
│   │   └── Dashboard.jsx
│   ├── EmployeeManagement/  # Employee management page
│   │   └── EmployeeManagement.jsx
│   ├── LeaveManagement/     # Leave management page
│   │   └── LeaveManagement.jsx
│   ├── Analytics/       # Analytics page
│   │   └── Analytics.jsx
│   └── index.js         # Page exports
├── store/               # State management stores
│   ├── employeeStore.js # Employee state management
│   └── leaveStore.js    # Leave request state management
├── theme/               # Material-UI theme configuration
│   └── theme.js
├── App.jsx              # Main App component with routing
├── main.jsx             # Application entry point
└── README.md            # This file
```

## Component Organization

### Pages
- **Dashboard**: Overview with statistics and recent activity
- **EmployeeManagement**: Employee CRUD operations and display
- **LeaveManagement**: Leave request management and approval
- **Analytics**: Department statistics and leave patterns

### Components
- **Layout**: Main layout with sidebar navigation and app bar
- **AddEmployeeDialog**: Modal for adding new employees
- **SubmitLeaveDialog**: Modal for submitting leave requests

### Stores
- **employeeStore**: Manages employee data and operations
- **leaveStore**: Manages leave request data and operations

### Theme
- **theme.js**: Material-UI theme configuration with Indian-inspired colors

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Maintainability**: Easier to find and modify specific functionality
3. **Reusability**: Components can be easily reused across pages
4. **Scalability**: Easy to add new features and components
5. **Testing**: Individual components can be tested in isolation
6. **Code Splitting**: Better for performance optimization

## Usage

Import components and pages using the index files:

```javascript
import { Dashboard, EmployeeManagement } from './pages';
import { Layout, AddEmployeeDialog } from './components';
```

Or import directly:

```javascript
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
```
