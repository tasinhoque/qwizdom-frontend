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
import { useParams } from 'react-router';

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
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(1, 1, 1, 1),
      padding: theme.spacing(1, 1, 1, 1),
    },
  },
  avatar: {
    backgroundColor: red[500],
    margin: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.down('xs')]: {
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginLeft: theme.spacing(0),
    },
  },
  hiddenXS: {
    [theme.breakpoints.down('xs')]: {
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

  const { id, userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subs, setSubs] = useState(null);

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }

    try {
      setLoading(true);

      console.log(id);
      const response = await api.getAllSubs(id);
      setSubs(response.data.results);
      console.log(response.data.results);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Card className={classes.subTitle}>
          <Grid container spacing={0} className={classes.titleContainer}>
            <Grid container item md={3} xs={3}>
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
              xs={4}
              // className={classes.hiddenXS}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Date
              </Typography>
            </Grid>

            <Grid
              container
              item
              md={2}
              className={classes.hiddenXS}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Total Marks
              </Typography>
            </Grid>
            <Grid
              container
              item
              md={2}
              className={classes.hiddenXS}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                Obtained Marks
              </Typography>
            </Grid>

            <Grid
              container
              item
              xs={3}
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
              xs={2}
              style={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="textPrimary">
                State
              </Typography>
            </Grid>
          </Grid>
        </Card>

        {subs != null &&
          subs.map((e, i) => {
            return (
              <SubmissionCard
                key={i}
                name={e.responder.name}
                avatar={e.responder.avatar}
                userid={e.responder.id}
                quizid={e.quiz.id}
                date={e.createdAt}
                isEvaluated={e.isEvaluated}
                isAuto={e.quiz.hasAutoEvaluation}
                marks={e.totalPoints}
                totalMarks={e.quiz.totalPoints}
              />
            );
          })}
      </div>
    </>
  );
}
