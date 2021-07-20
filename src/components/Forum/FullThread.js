import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import api from '../../api';

const useStyles = makeStyles(theme => ({
  rootDivider: {
    height: '2px',
    // backgroundColor: 'black'
  },
  paperStyle: {
    // minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
  },
  dummyContainer: {
    display: 'flex',
    flexGrow: '1',
    cursor: 'pointer',
    justifyContent: 'center',
    '& > *': {
      margin: '5px',
    },
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
  footer: {
    width: 'fit-content',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    '& > *': {
      marginRight: '4px',
    },
    '&:hover': {
      backgroundColor: '#60519833',
    },
  },
}));

export default function FullThread() {
  const classes = useStyles();
  const { quizId, threadId } = useParams();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('quizId ,threadid', quizId, threadId);
  useEffect(() => {
    api.getThreadComments(threadId).then(res => {
      console.log(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Grid spacing={3} container justify="center">
          <Grid item md={8} xs={12}>
            <Paper
              className={classes.paperStyle}
              variant="outlined"
              square
            ></Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
