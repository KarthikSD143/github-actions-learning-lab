import { useEffect, useState } from 'react';

function normalizeResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  if (data && Array.isArray(data.items)) {
    return data.items;
  }

  return [];
}

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/api/activities/`);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }
        const data = await response.json();
        setActivities(normalizeResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {activities.map((activity) => (
          <div className="list-group-item" key={activity._id || activity.id}>
            <h5 className="mb-1">{activity.type}</h5>
            <p className="mb-1">{activity.durationMinutes} minutes</p>
            <small>{activity.distanceKm ? `${activity.distanceKm} km` : 'Distance not recorded'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
