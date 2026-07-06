import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeResponse } from '../utils/api.js';
// Environment-aware OctoFit teams endpoint.

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }
        const data = await response.json();
        setTeams(normalizeResponse(data));
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {teams.map((team) => (
          <div className="list-group-item" key={team._id || team.id}>
            <h5 className="mb-1">{team.name}</h5>
            <p className="mb-1">Captain: {team.captain}</p>
            <small>{team.sport}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
