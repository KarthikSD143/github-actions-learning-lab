import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from '../utils/api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }
        const data = await response.json();
        setUsers(normalizeResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {users.map((user) => (
          <div className="list-group-item" key={user._id || user.id || user.email}>
            <h5 className="mb-1">{user.name}</h5>
            <p className="mb-1">{user.email}</p>
            <small>{user.city || 'Unknown city'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
