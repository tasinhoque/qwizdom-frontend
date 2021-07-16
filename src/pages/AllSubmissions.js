import { useRef, useState, useEffect } from 'react';
import { SingleCard } from '../components';
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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';

import api from '../api';
import {
  Header,
  DashboardBody,
  DashboardSidebar,
  SubmissionCard,
} from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  subTitle: {
    // maxWidth: 400,
    width: '60%',
    margin: theme.spacing(1, 5, 1, 5),
    padding: theme.spacing(2, 2, 2, 2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: theme.spacing(1, 1, 1, 1),
      padding: theme.spacing(1, 1, 1, 1),
    },
  },
  avatar: {
    backgroundColor: red[500],
    margin: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
  titleContainer: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      marginLeft: theme.spacing(0),
    },
  },
  hiddenSM: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hiddenMD: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function AllSubmissions() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.root}>
        <Card className={classes.subTitle}>
          <Grid
            container
            direction="row"
            spacing={0}
            className={classes.titleContainer}
          >
            <Grid container item md={3} sm={3}>
              <div className={classes.user}>
                <Typography variant="body2" color="textPrimary">
                  Participant
                </Typography>
              </div>
            </Grid>

            <Grid
              container
              item
              md={3}
              className={classes.hiddenSM}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Submission Date
              </Typography>
            </Grid>
            <Grid
              container
              item
              md={3}
              className={classes.hiddenSM}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Total Marks
              </Typography>
            </Grid>
            <Grid
              container
              item
              md={3}
              className={classes.hiddenSM}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Obtained Marks
              </Typography>
            </Grid>

            <Grid
              container
              item
              sm={3}
              className={classes.hiddenMD}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Date
              </Typography>
            </Grid>
            <Grid
              container
              item
              sm={3}
              className={classes.hiddenMD}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Marks
              </Typography>
            </Grid>

            <Grid
              container
              item
              md={2}
              sm={3}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                State
              </Typography>
            </Grid>
          </Grid>
        </Card>

        <SubmissionCard />
        <SubmissionCard />
        <SubmissionCard />
        <SubmissionCard />
        <SubmissionCard />
      </div>
    </>
  );
}
