import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Teams data fetched:', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="page-heading">🏆 Teams</h2>
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Active Teams</span>
          <span className="badge bg-light text-success">{teams.length} total</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4"><div className="spinner-border text-success" role="status" /></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><span className="fw-semibold">{team.name}</span></td>
                      <td>
                        {(Array.isArray(team.members) ? team.members : [team.members]).map((m, i) => (
                          <span key={i} className="badge bg-secondary me-1">{m}</span>
                        ))}
                      </td>
                      <td><span className="badge bg-info text-dark">{Array.isArray(team.members) ? team.members.length : 1}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
