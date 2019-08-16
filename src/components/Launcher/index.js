import React, { useState, useEffect } from 'react';
import { oauth2 as SMART } from 'fhirclient';

export default function Launcher({ location }) {
  const [error, setError] = useState('');
  useEffect(() => {
    SMART.authorize({
      clientId: 'smart-surveys',
      scope: 'launch launch/patient patient/read offline_access',
      redirectUri: '/app',
    }).catch(err => setError(err.message));
  }, []);

  return error ? <h2>There was an error authorizing app: {error}</h2> : <h2>Launching...</h2>;
};
