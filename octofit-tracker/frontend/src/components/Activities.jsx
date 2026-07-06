import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from '../utils/api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
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
