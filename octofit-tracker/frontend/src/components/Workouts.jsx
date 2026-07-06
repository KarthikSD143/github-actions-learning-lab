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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/api/workouts/`);
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
