import { useState } from 'react';

const UserForm = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding user');
      }

      await response.json();
      fetchUsers(); // this should work now since fetchUsers is passed as a prop
      setFormData({ name: '', email: '', address: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Add User</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
