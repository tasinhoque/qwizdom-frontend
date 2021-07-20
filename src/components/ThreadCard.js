import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  root: {},
  paperStyle: {
    minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
}));

export default function ThreadCard(props) {
  const classes = useStyles();

  const thread = props.thread;
  //   console.log(props);

  return (
    <Paper className={classes.paperStyle} variant="outlined" square>
      <Grid container></Grid>
      {thread.text}
    </Paper>
  );
}
