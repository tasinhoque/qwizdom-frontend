import React, { useRef, useState, useEffect } from 'react';
import { Avatar, Button, TextField, FormControlLabel } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../api';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const userNameRef = useRef('');
  const valueRef = useRef('');
  const passRef = useRef('');
  const [errorMessage, setErrorValue] = useState(' ');
  useEffect(() => {
    const signedIn = localStorage.getItem('refreshToken');
    if (signedIn) {
      props.history.push('/dashboard');
    }
  }, []);

  const sendValue = async event => {
    event.preventDefault();
    const registerBody = {
      name: userNameRef.current.value,
      email: valueRef.current.value,
      password: passRef.current.value,
    };

    await api
      .signup(registerBody)
      .then(res => {
        localStorage.setItem('accessToken', res.data.tokens.access.token);
        localStorage.setItem('refreshToken', res.data.tokens.refresh.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        console.log(res);
        props.history.push('/dashboard');
      })
      .catch(error => {
        setErrorValue(error.response.data.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="name"
            autoFocus
            inputRef={userNameRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={valueRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passRef}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ color: 'red' }}>{errorMessage.toString()}</p>
          </div>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendValue}
          >
            Sign Up
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
