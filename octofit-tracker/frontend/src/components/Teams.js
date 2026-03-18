import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <div className="card octofit-card">
      <div className="card-header d-flex align-items-center justify-content-between">
        <h2>&#128101; Teams</h2>
        <span className="badge bg-secondary">{teams.length} teams</span>
      </div>
      <div className="card-body p-0">
        {error && (
          <div className="alert alert-danger m-3">Error: {error}</div>
        )}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : teams.length === 0 ? (
          <p className="text-muted text-center py-4">No teams found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover octofit-table mb-0">
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team._id || team.id || index}>
                    <td>
                      <strong>{team.name}</strong>
                    </td>
                    <td>
                      {Array.isArray(team.members)
                        ? team.members.map((m, i) => (
                            <span key={i} className="badge bg-info text-dark me-1">{m}</span>
                          ))
                        : <span className="badge bg-info text-dark">{team.members}</span>}
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

export default Teams;
