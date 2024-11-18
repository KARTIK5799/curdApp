import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Management System</h1>
      {/* <UserForm /> */}
      <UserList />
    </div>
  );
}

export default App;