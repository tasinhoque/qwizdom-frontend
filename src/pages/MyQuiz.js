import { useRef, useState, useEffect } from 'react';
import { MyQuizTemplate, SingleCard } from '../components';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import api from '../api';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';

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
    justifyContent: 'center',
    overflow: 'hidden',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  innerContainer: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function MyQuiz() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [subbedQuizzes, setSubbedQuizzes] = useState([]);
  const [draftQuizzes, setDraftQuizzes] = useState([]);
  const [doneQuizzes, setDoneQuizzes] = useState([]);
  const [publishedQuizzes, setPublishedQuizzes] = useState([]);
  useEffect(async () => {
    let response = await api.getSubbedQuizzes();
    setSubbedQuizzes(response.data.results);
    response = await api.getPublishedQuizzes();
    console.log(response.data.results);
    setPublishedQuizzes(response.data.results);
    response = await api.getDraftQuizzes();
    setDraftQuizzes(response.data.results);
    response = await api.getDoneQuizzes();
    setDoneQuizzes(response.data);
    setLoading(false);
  }, []);
  return (
    <>
      <Header />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <Grid
            container
            className={classes.root}
            direction="column"
            alignContent="center"
          >
            <Grid
              container
              direction="column"
              className={classes.innerContainer}
              sm={10}
            >
              <Grid item style={{ width: '100%' }}>
                <MyQuizTemplate
                  type={`Published Quizzes`}
                  quizzes={publishedQuizzes}
                />
              </Grid>
              <Grid item>
                <MyQuizTemplate type={`Draft Quizzes`} quizzes={draftQuizzes} />
              </Grid>
              <Grid item>
                <MyQuizTemplate
                  type={` Participated Quizzes`}
                  quizzes={doneQuizzes}
                />
              </Grid>
              <Grid item>
                <MyQuizTemplate
                  type={`Subscribed Quizzes`}
                  quizzes={subbedQuizzes}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
