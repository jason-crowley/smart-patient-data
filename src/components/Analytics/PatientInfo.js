import React, { useState, useEffect, useContext } from 'react';
import { FhirClientContext } from 'contexts/FhirClientContext';
import Paper from '@material-ui/core/Paper';

export default function PatientInfo(props) {
  const client = useContext(FhirClientContext);
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    client.patient.read().then(setPatient)
      .catch(() => setPatient(null));
  }, [client.patient]);
  console.log(patient);
  return patient && (
    <div className="PatientInfo">
      <Paper>
        <pre>{JSON.stringify(patient, null, 2)}</pre>
      </Paper>
    </div>
  );
};
