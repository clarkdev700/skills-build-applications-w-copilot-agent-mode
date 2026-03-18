import React, { useState, useEffect } from 'react';

const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2>&#127942; Leaderboard</h2>
        <span className="badge bg-secondary">{entries.length} entries</span>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3">Error: {error}</div>
        )}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : entries.length === 0 ? (
          <p className="text-muted text-center py-4">No leaderboard entries found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || index}>
                    <td className="text-center">
                      <span
                        className="rank-badge"
                        style={index < 3 ? { backgroundColor: medalColors[index], color: '#0d1117' } : {}}
                      >
                        {index + 1}
                      </span>
                    </td>
                    <td>{entry.user}</td>
                    <td>
                      <span className="badge bg-success fs-6">{entry.score}</span>
                    </td>
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

export default Leaderboard;
