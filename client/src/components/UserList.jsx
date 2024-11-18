import { useState, useEffect } from 'react';
import { FaTrashAlt, FaPen } from 'react-icons/fa'; // Importing React Icons
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      fetchUsers(); // Refresh the list of users after deletion
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  // Function to handle edit button click (for now, just logs the user's ID)
  const editUser = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Here you could navigate to an edit page or open an edit form
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <UserForm fetchUsers={fetchUsers} />
      <div className="bg-white p-6 shadow-md rounded-md mt-6">
        <h2 className="text-lg font-bold mb-4">User List</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => editUser(user._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaPen />
                    </button>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
