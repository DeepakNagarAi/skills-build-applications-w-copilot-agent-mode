# Project Brief: OctoFit Tracker

## Purpose
A fitness tracking web app for Mergington High School students, built using GitHub Copilot agent mode as a learning exercise.

## Core Features
- User authentication and profiles
- Activity logging and tracking (running, walking, strength training)
- Team creation and management
- Competitive leaderboard
- Personalized workout suggestions

## Tech Stack
- Frontend: React.js + Bootstrap + React Router
- Backend: Python Django REST Framework
- Database: MongoDB (via Djongo ORM)
- Dev Environment: GitHub Codespaces

## Project Structure
```
octofit-tracker/
├── backend/
│   ├── venv/
│   └── octofit_tracker/
└── frontend/
```

## Ports
- 8000: Django backend (public)
- 3000: React frontend (public)
- 27017: MongoDB (private)
