import React, { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME || '';
const API_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

const ACTIVITY_ICONS = {
  running: '🏃',
  walking: '🚶',
  'strength training': '🏋️',
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log('Activities data fetched:', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="page-heading">🏃 Activities</h2>
      <div className="card">
        <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
          <span className="fw-semibold">Logged Activities</span>
          <span className="badge bg-dark">{activities.length} total</span>
        </div>
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-4"><div className="spinner-border text-warning" role="status" /></div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Activity Type</th>
                    <th>Duration (min)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id}>
                      <td className="text-muted">{index + 1}</td>
                      <td><span className="fw-semibold">{activity.user}</span></td>
                      <td>
                        {ACTIVITY_ICONS[activity.activity_type] || '🏅'}{' '}
                        <span className="text-capitalize">{activity.activity_type}</span>
                      </td>
                      <td><span className="badge bg-warning text-dark">{activity.duration} min</span></td>
                      <td>{activity.date}</td>
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

export default Activities;
