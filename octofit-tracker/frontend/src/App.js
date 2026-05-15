import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="32" className="rounded-circle" />
              <span className="fw-bold">OctoFit Tracker</span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {[
                  { path: '/users', label: '👤 Users' },
                  { path: '/teams', label: '🏆 Teams' },
                  { path: '/activities', label: '🏃 Activities' },
                  { path: '/leaderboard', label: '📊 Leaderboard' },
                  { path: '/workouts', label: '💪 Workouts' },
                ].map(({ path, label }) => (
                  <li className="nav-item" key={path}>
                    <NavLink className={({ isActive }) => 'nav-link px-3' + (isActive ? ' active fw-semibold' : '')} to={path}>
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow-1 py-4">
          <div className="container">
            <Routes>
              <Route path="/" element={
                <div className="welcome-hero text-center shadow">
                  <img src="/octofitapp-small.png" alt="OctoFit" height="90" className="mb-3 rounded-circle border border-3 border-white" />
                  <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker 🏋️</h1>
                  <p className="lead mb-4">Fitness tracking for Mergington High School students</p>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    {['/users', '/teams', '/activities', '/leaderboard', '/workouts'].map(path => (
                      <NavLink key={path} to={path} className="btn btn-light btn-sm fw-semibold text-capitalize">
                        {path.replace('/', '')}
                      </NavLink>
                    ))}
                  </div>
                </div>
              } />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/workouts" element={<Workouts />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="container">
            &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Mergington High School
          </div>
        </footer>

      </div>
    </Router>
  );
}

export default App;
