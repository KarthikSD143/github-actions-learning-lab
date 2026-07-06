import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from '../utils/api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }
        const data = await response.json();
        setEntries(normalizeResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div className="list-group-item" key={entry._id || entry.id}>
            <h5 className="mb-1">{entry.name}</h5>
            <p className="mb-1">{entry.points} points</p>
            <small>Rank {entry.rank || '—'}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
