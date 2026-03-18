import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Workouts: fetched data', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2>&#127947; Workouts</h2>
        <span className="badge bg-secondary">{workouts.length} workouts</span>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3">Error: {error}</div>
        )}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : workouts.length === 0 ? (
          <p className="text-muted text-center py-4">No workouts found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={workout._id || workout.id || index}>
                    <td>
                      <strong>{workout.name}</strong>
                    </td>
                    <td>{workout.description}</td>
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

export default Workouts;
