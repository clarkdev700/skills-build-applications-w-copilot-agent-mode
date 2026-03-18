import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import octoLogo from './octofit-logo.png';
import './App.css';

const navLinks = [
  { to: '/users',       label: 'Users' },
  { to: '/teams',       label: 'Teams' },
  { to: '/activities',  label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts',    label: 'Workouts' },
];

function App() {
  return (
    <div className="octofit-page">
      {/* ── Navbar ── */}
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
        <div className="container">
          <span className="navbar-brand d-flex align-items-center gap-2">
            <img
              src={octoLogo}
              alt="OctoFit logo"
              className="octofit-logo"
            />
            OctoFit Tracker
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNav"
            aria-controls="octofitNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="octofitNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link' + (isActive ? ' active' : '')
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Main content ── */}
      <div className="container py-4">
        <Routes>
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
          <Route path="/"            element={<Users />} />
        </Routes>
      </div>

      {/* ── Footer ── */}
      <footer className="text-center py-3 octofit-footer">
        OctoFit Tracker &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
