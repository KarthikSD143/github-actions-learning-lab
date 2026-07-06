import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from '../utils/api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!response.ok) {
          throw new Error('Unable to load workouts');
        }
        const data = await response.json();
        setWorkouts(normalizeResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {workouts.map((workout) => (
          <div className="list-group-item" key={workout._id || workout.id}>
            <h5 className="mb-1">{workout.name}</h5>
            <p className="mb-1">{workout.durationMinutes} minutes</p>
            <small>{workout.difficulty}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
