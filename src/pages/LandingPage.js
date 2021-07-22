import api from '../api';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/bg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {},
  qwizdomContainer: {
    paddingLeft: theme.spacing(10),
  },
  qwizdomTitle: {
    fontFamily: 'Rammetto One',
    fontSize: theme.spacing(10),
    color: 'white',
  },
  qwizdomDescription: {
    fontSize: theme.spacing(4),
    color: 'white',
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
}));

export default function LandingPage() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          // justify="space-around"
          className={classes.container}
        >
          <Grid container item md={6} className={classes.qwizdomContainer}>
            <Grid item md={12} className={classes.qwizdomTitle}>
              Qwizdom
            </Grid>
            <Grid item md={12} className={classes.qwizdomDescription}>
              All your quizzes in one unified platform
            </Grid>
          </Grid>
          <Grid
            container
            item
            md={6}
            className={classes.qwizdomContainer}
          ></Grid>
        </Grid>
      </div>
    </>
  );
}
