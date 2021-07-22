import api from '../api';
import { SignIn, SignUp } from '../components';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/bg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  container: {
    marginTop: theme.spacing(10),
  },
  qwizdomContainer: {
    paddingLeft: theme.spacing(10),
  },
  qwizdomTitle: {
    fontFamily: 'Rammetto One',
    fontSize: theme.spacing(10),
    color: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  qwizdomDescription: {
    fontSize: theme.spacing(4),
    color: 'white',
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  signinContainer: {},
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = function () {
    setShowSignUp(!showSignUp);
  };

  useEffect(() => {
    const signedIn = localStorage.getItem('refreshToken');
    if (signedIn) {
      props.history.push('/dashboard');
    }
  }, []);

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <Grid
          container
          direction="row"
          // justify="space-around"
          className={classes.container}
        >
          <Grid item md={6} className={classes.qwizdomContainer}>
            <div className={classes.qwizdomTitle}>
              <span style={{ color: 'white' }}>Q</span>wizdom
            </div>
            <div className={classes.qwizdomDescription}>
              All your quizzes in one unified platform
            </div>
          </Grid>
          <Grid item md={6} className={classes.signinContainer}>
            {!showSignUp ? (
              <SignIn history={props.history} toggle={toggleSignUp} />
            ) : (
              <SignUp history={props.history} toggle={toggleSignUp} />
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
