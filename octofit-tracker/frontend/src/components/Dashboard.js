import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const fetchJSON = (endpoint) =>
  fetch(`${API_BASE}/api/${endpoint}/`)
    .then(r => r.json())
    .then(d => Array.isArray(d) ? d : d.results || [])
    .catch(() => []);

function StatCard({ icon, label, value, color, to }) {
  return (
    <NavLink to={to} className="text-decoration-none col-6 col-md-3">
      <div className={`card stat-card border-0 h-100`}>
        <div className="card-body d-flex align-items-center gap-3 p-3">
          <div className={`stat-icon bg-${color} bg-opacity-15 text-${color}`}>{icon}</div>
          <div>
            <div className="stat-value">{value ?? <span className="placeholder col-4" />}</div>
            <div className="stat-label text-muted">{label}</div>
          </div>
        </div>
        <div className={`stat-bar bg-${color}`} />
      </div>
    </NavLink>
  );
}

function Dashboard() {
  const [users, setUsers] = useState(null);
  const [teams, setTeams] = useState(null);
  const [activities, setActivities] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    fetchJSON('users').then(setUsers);
    fetchJSON('teams').then(setTeams);
    fetchJSON('activities').then(setActivities);
    fetchJSON('leaderboard').then(setLeaderboard);
    fetchJSON('workouts').then(setWorkouts);
  }, []);

  const topAthletes = leaderboard
    ? [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5)
    : [];

  const recentActivities = activities
    ? [...activities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
    : [];

  const ACTIVITY_ICONS = { running: '🏃', walking: '🚶', 'strength training': '🏋️' };
  const RANK_MEDALS = ['🥇', '🥈', '🥉'];

  return (
    <div>
      {/* Hero */}
      <div className="welcome-hero text-center mb-4">
        <img src="/octofitapp-small.png" alt="OctoFit" height="80"
          className="mb-3 rounded-circle border border-3 border-white shadow" />
        <h1 className="display-5 fw-bold mb-1">OctoFit Tracker 🏋️</h1>
        <p className="lead mb-0 opacity-75">Fitness dashboard for Mergington High School</p>
      </div>

      {/* Stat cards */}
      <div className="row g-3 mb-4">
        <StatCard icon="👤" label="Users"       value={users?.length}       color="primary"   to="/users" />
        <StatCard icon="🏆" label="Teams"       value={teams?.length}       color="success"   to="/teams" />
        <StatCard icon="🏃" label="Activities"  value={activities?.length}  color="warning"   to="/activities" />
        <StatCard icon="💪" label="Workouts"    value={workouts?.length}    color="info"      to="/workouts" />
      </div>

      <div className="row g-4 mb-4">
        {/* Top Leaderboard */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
              <span className="fw-semibold">📊 Top Athletes</span>
              <NavLink to="/leaderboard" className="btn btn-sm btn-outline-light">View All</NavLink>
            </div>
            <div className="card-body p-0">
              {topAthletes.length === 0 ? (
                <div className="text-center py-4 text-muted">Loading...</div>
              ) : (
                <table className="table table-hover mb-0">
                  <tbody>
                    {topAthletes.map((entry, i) => {
                      const maxScore = topAthletes[0]?.score || 1;
                      const pct = Math.round((entry.score / maxScore) * 100);
                      return (
                        <tr key={entry.id}>
                          <td className="ps-3" style={{ width: 40 }}>
                            {i < 3 ? RANK_MEDALS[i] : <span className="text-muted fw-bold">{i + 1}</span>}
                          </td>
                          <td className="fw-semibold">{entry.user}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="progress flex-grow-1" style={{ height: 8 }}>
                                <div className="progress-bar bg-danger" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="badge bg-danger">{entry.score}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
              <span className="fw-semibold">🏃 Recent Activities</span>
              <NavLink to="/activities" className="btn btn-sm btn-outline-dark">View All</NavLink>
            </div>
            <div className="card-body p-0">
              {recentActivities.length === 0 ? (
                <div className="text-center py-4 text-muted">Loading...</div>
              ) : (
                <table className="table table-hover mb-0">
                  <tbody>
                    {recentActivities.map(a => (
                      <tr key={a.id}>
                        <td className="ps-3">{ACTIVITY_ICONS[a.activity_type] || '🏅'}</td>
                        <td className="fw-semibold">{a.user}</td>
                        <td className="text-capitalize text-muted">{a.activity_type}</td>
                        <td><span className="badge bg-warning text-dark">{a.duration} min</span></td>
                        <td className="text-muted small">{a.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Teams quick view */}
      <div className="card mb-4">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">🏆 Teams</span>
          <NavLink to="/teams" className="btn btn-sm btn-outline-light">View All</NavLink>
        </div>
        <div className="card-body">
          {!teams ? (
            <div className="text-center py-2 text-muted">Loading...</div>
          ) : (
            <div className="row g-3">
              {teams.map(team => (
                <div className="col-md-6" key={team.id}>
                  <div className="d-flex align-items-start gap-3 p-3 rounded border bg-light">
                    <div className="fs-2">🏆</div>
                    <div>
                      <div className="fw-bold">{team.name}</div>
                      <div className="mt-1">
                        {(Array.isArray(team.members) ? team.members : [team.members]).map((m, i) => (
                          <span key={i} className="badge bg-success me-1 mb-1">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick nav to workouts */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span className="fw-semibold">💪 Featured Workouts</span>
          <NavLink to="/workouts" className="btn btn-sm btn-outline-light">View All</NavLink>
        </div>
        <div className="card-body">
          {!workouts ? (
            <div className="text-center py-2 text-muted">Loading...</div>
          ) : (
            <div className="row g-3">
              {workouts.slice(0, 3).map((w, i) => {
                const colors = ['primary', 'success', 'info'];
                const c = colors[i % colors.length];
                return (
                  <div className="col-md-4" key={w.id}>
                    <div className={`card border-${c} h-100`}>
                      <div className={`card-header bg-${c} text-white py-2`}>
                        <span className="fw-semibold">💪 {w.name}</span>
                      </div>
                      <div className="card-body py-2">
                        <p className="card-text small text-muted mb-2">{w.description}</p>
                        <span className={`badge bg-${c}`}>⏱ {w.duration} min</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
