import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [summary, setSummary] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:8000/users');
    setUsers(res.data);
  };

  const fetchSummary = async () => {
    const res = await axios.get('http://localhost:8000/summary');
    setSummary(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/users', { name, age });
    alert('User added!');
    setName('');
    setAge('');
    fetchUsers();
    fetchSummary();
  };

  useEffect(() => {
    fetchUsers();
    fetchSummary();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Users (via R API)</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>All Users</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user.name} - {user.age}</li>
        ))}
      </ul>

      {summary && (
        <div>
          <h2>Summary of Age</h2>
          <pre>{JSON.stringify(summary, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
