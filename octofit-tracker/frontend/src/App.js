import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <NavLink className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit" height="30" className="me-2" />
              OctoFit Tracker
            </NavLink>
            <div className="navbar-nav">
              <NavLink className="nav-link" to="/users">Users</NavLink>
              <NavLink className="nav-link" to="/teams">Teams</NavLink>
              <NavLink className="nav-link" to="/activities">Activities</NavLink>
              <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<h2>Welcome to OctoFit Tracker 🏋️</h2>} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
