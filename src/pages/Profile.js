import { useRef, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import api from '../api';
import { Header, DashboardBody, DashboardSidebar } from '../components';

const useStyles = makeStyles(theme => ({
  root: {},
  buttons: {
    position: 'relative',
    // width: '100%',
  },
  editButton: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  textField: {
    '& input': {
      color: '#000000',
    },
    '& input:disabled': {
      color: '#444444',
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  const nameRef = useRef('');
  const emailRef = useRef('');
  const [formEnabled, enableForm] = useState(!false);

  const saveProfile = async event => {
    let res;
    enableForm(true);

    event.preventDefault();
    const profileBody = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };
    res = await api
      .editProfile(profileBody)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        // setErrorValue(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Header />

      <Grid container className={classes.root}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item md={12} xs={12}>
            <Avatar
              alt="Remy Sharp"
              src="/assets/images/user.png"
              className={classes.avatar}
            />
          </Grid>
          <form noValidate autoComplete="off">
            <Grid item md={12} xs={12}>
              <TextField
                defaultValue="Remy Sharp"
                disabled={formEnabled}
                label="Name"
                className={classes.textField}
                inputProps={{
                  min: 0,
                  style: { textAlign: 'center' },
                }}
                inputRef={nameRef}
              ></TextField>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                label="Email"
                defaultValue="aaron@gmail.com"
                disabled={formEnabled}
                className={classes.textField}
                inputProps={{ min: 0, style: { textAlign: 'center' } }}
                inputRef={emailRef}
              ></TextField>
            </Grid>
          </form>
        </Grid>
        <Grid container justify="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
            onClick={() => enableForm(false)}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
            onClick={saveProfile}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
