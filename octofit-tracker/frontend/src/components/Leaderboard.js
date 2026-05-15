import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/leaderboard/`)
      .then(res => res.json())
      .then(data => setEntries(data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr><th>Rank</th><th>User</th><th>Score</th></tr>
        </thead>
        <tbody>
          {entries
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
