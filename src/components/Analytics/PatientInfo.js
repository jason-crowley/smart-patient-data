import React, { useState, useEffect, useContext } from 'react';
import { FhirClientContext } from 'contexts/FhirClientContext';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
  name: {
    flexGrow: 1,
  },
}));

export default function PatientInfo(props) {
  const client = useContext(FhirClientContext);
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    client.patient.read().then(setPatient)
      .catch(() => setPatient(null));
  }, [client.patient]);
  const classes = useStyles();

  if (!patient) return null;
  console.log(patient);
  const {
    name: [{ prefix, given, family }],
    gender,
    birthDate,
    id,
    telecom: [{ value: phone }],
    address: [{ line: address }],
  } = patient;
  const name = `${prefix[0]} ${given[0]} ${family} `;
  const age = moment().diff(birthDate, 'years');

  return (
    <div className="PatientInfo">
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar>{given[0][0]}</Avatar>
          </Grid>
          <Grid item className={classes.name}>
            <Typography variant="h4" component="h1">
              {name}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              Gender: {gender}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              DOB: {birthDate}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              Age: {age}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              ID: {id}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              Phone: {phone}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" component="span">
              Address: {address}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
