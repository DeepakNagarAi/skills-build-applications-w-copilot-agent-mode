import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function getRankClass(index) {
  if (index === 0) return 'rank-badge rank-1';
  if (index === 1) return 'rank-badge rank-2';
  if (index === 2) return 'rank-badge rank-3';
  return 'rank-badge rank-other';
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard data fetched:', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, []);

  const sorted = [...entries].sort((a, b) => b.score - a.score);

  return (
    <div>
      <h2 className="page-heading">📊 Leaderboard</h2>
      <div className="card">
        <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Top Performers</span>
          <span className="badge bg-light text-danger">{entries.length} athletes</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4"><div className="spinner-border text-danger" role="status" /></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Score</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((entry, index) => {
                    const maxScore = sorted[0]?.score || 1;
                    const pct = Math.round((entry.score / maxScore) * 100);
                    return (
                      <tr key={entry.id}>
                        <td><span className={getRankClass(index)}>{index + 1}</span></td>
                        <td><span className="fw-semibold">{entry.user}</span></td>
                        <td><span className="badge bg-danger fs-6">{entry.score}</span></td>
                        <td style={{ minWidth: '120px' }}>
                          <div className="progress" style={{ height: '10px' }}>
                            <div className="progress-bar bg-danger" style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
