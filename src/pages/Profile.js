import { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import api from '../api';
import { Header, DashboardBody, DashboardSidebar } from '../components';

const useStyles = makeStyles(theme => ({
  root: {},
  buttons: {
    position: 'relative',
    // width: '100%',
  },
  editButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginTop: theme.spacing(5),
  },
}));

export default function Profile() {
  const classes = useStyles();

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
          <Grid item md={12} xs={12}>
            <TextField
              defaultValue="Remy Sharp"
              className={classes.userName}
              inputProps={{
                min: 0,
                style: { textAlign: 'center' },
              }}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              defaultValue="aaron@gmail.com"
              className={classes.userName}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              defaultValue="01202828392919"
              className={classes.userName}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
            ></TextField>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
          >
            Edit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.editButton}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
