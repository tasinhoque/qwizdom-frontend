import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';

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
  headerContainer: {
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
  const [thread, setThread] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  console.log('quizId ,threadid', quizId, threadId);
  useEffect(async () => {
    await api.getSingleDiscussionThread(threadId).then(res => {
      setThread(res.data);
      console.log(res);
    });
    await api.getThreadComments(threadId).then(res => {
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
            <Paper className={classes.paperStyle} variant="outlined" square>
              <Grid container style={{ borderRadius: '6px' }}>
                <div className={classes.headerContainer}>
                  <Avatar alt={thread.user.name} src={thread.user.avatar} />
                  <div
                    style={{
                      flexGrow: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignSelf: 'center',
                    }}
                  >
                    <Typography style={{ fontWeight: '500' }}>
                      {thread.user.name}{' '}
                    </Typography>
                    <Typography style={{ fontWeight: '500' }}>
                      {Moment(thread.createdAt).format('DD MMMM,YYYY')}
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Divider
                classes={{
                  root: classes.rootDivider,
                }}
                variant="fullWidth"
              />
              <Grid
                style={{
                  margin: '15px 15px 25px 15px',
                  whiteSpace: 'pre-line',
                  cursor: 'default',
                }}
              >
                <Typography style={{ marginBottom: '10px' }} variant="h6">
                  {thread.title}
                </Typography>
                {thread.text}
              </Grid>
              <Divider
                classes={{
                  root: classes.rootDivider,
                }}
                style={{ marginBottom: '13px' }}
                variant="fullWidth"
              />
              <div className={classes.footer}>
                <ModeCommentOutlinedIcon style={{ fontSize: '30' }} />
                <Typography style={{ fontWeight: '400', fontSize: '16px' }}>
                  20 Comments
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
}
