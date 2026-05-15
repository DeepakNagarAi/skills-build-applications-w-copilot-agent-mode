import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/workouts/`)
      .then(res => res.json())
      .then(data => setWorkouts(data))
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <div className="row">
        {workouts.map(workout => (
          <div className="col-md-4 mb-3" key={workout.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <span className="badge bg-primary">{workout.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
