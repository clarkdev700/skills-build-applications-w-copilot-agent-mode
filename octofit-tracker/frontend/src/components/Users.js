import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2>&#128100; Users</h2>
        <span className="badge bg-secondary">{users.length} users</span>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3">Error: {error}</div>
        )}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : users.length === 0 ? (
          <p className="text-muted text-center py-4">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || user.id || index}>
                    <td>
                      <strong>{user.username}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email}
                      </a>
                    </td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
