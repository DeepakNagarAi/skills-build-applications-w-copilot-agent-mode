import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

const WORKOUT_COLORS = ['primary', 'success', 'warning', 'danger', 'info', 'secondary'];

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching workouts from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts data fetched:', data);
        setWorkouts(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="page-heading">💪 Workouts</h2>
      {loading ? (
        <div className="text-center py-4"><div className="spinner-border text-primary" role="status" /></div>
      ) : (
        <div className="row g-3">
          {workouts.map((workout, index) => {
            const color = WORKOUT_COLORS[index % WORKOUT_COLORS.length];
            return (
              <div className="col-md-4 col-sm-6" key={workout.id}>
                <div className="card h-100">
                  <div className={`card-header bg-${color} text-${color === 'warning' ? 'dark' : 'white'}`}>
                    <h5 className="card-title mb-0 fw-bold">💪 {workout.name}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text flex-grow-1">{workout.description}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className={`badge bg-${color} text-${color === 'warning' ? 'dark' : 'white'}`}>
                        ⏱ {workout.duration} min
                      </span>
                      <button className={`btn btn-outline-${color} btn-sm`}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Workouts;
