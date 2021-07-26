import { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Container,
  Divider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import TextField from '@material-ui/core/TextField';
import Comment from './Comment';
import Header from '../Header';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  rootDivider: {
    height: '2px',
    // backgroundColor: 'black'
  },
  paperStyle: {
    // minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
    marginTop: '25px',
    wordBreak: 'break-word',
  },
  dummyContainer: {
    display: 'flex',
    // width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    // '& > *': {
    //   margin: '5px',
    // },
  },
  textFieldContainer: {
    display: 'flex',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexGrow: '1',
    },
    '& > *': {
      margin: '5px',
    },
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
  innerContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexGrow: '1',
    },
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
  arrowStyle: {
    fontSize: '35px',
    cursor: 'pointer',
  },
  input: {
    borderColor: '#60519833 !important',
    backgroundColor: '#60519833',

    // background: '#60519833',
    borderRadius: '10px',
  },
  footer: {
    width: 'fit-content',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    marginBottom: '30px',

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
  const [threadComments, setThreadComments] = useState('');
  const [pageRefresher, setPageRefresher] = useState(9);

  const commentRef = useRef('');

  const [upUser, setUpUser] = useState(false);
  const [downUser, setDownUser] = useState(false);

  const [voteCount, setVoteCount] = useState('');
  const handleUpVote = () => {
    if (upUser) {
      setVoteCount(prev => {
        prev--;
        return prev;
      });
      api
        .upVoteFlip(thread.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setUpUser(false);
      return;
    }
    if (downUser) {
      setVoteCount(prev => {
        prev++;
        setDownUser(false);

        return prev;
      });
      api
        .downVoteFlip(thread.id)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
    setUpUser(true);

    setVoteCount(prev => {
      prev++;
      return prev;
    });
    api
      .upVoteFlip(thread.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDownVote = () => {
    if (downUser) {
      setVoteCount(prev => {
        prev++;
        return prev;
      });
      api
        .downVoteFlip(thread.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setDownUser(false);
      return;
    }
    if (upUser) {
      setVoteCount(prev => {
        prev--;
        setUpUser(false);

        return prev;
      });
      api.upVoteFlip(thread.id);
    }
    setDownUser(true);
    setVoteCount(prev => {
      prev--;
      return prev;
    });
    api
      .downVoteFlip(thread.id)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  console.log('quizId ,threadid', quizId, threadId);
  const handleSubmit = () => {
    if (commentRef.current.value == '') return;
    const postBody = { text: commentRef.current.value };
    api.postComment(threadId, postBody).then(res => {
      commentRef.current.value = '';
      setPageRefresher(Math.random());
    });
  };
  useEffect(async () => {
    await api.getSingleDiscussionThread(threadId).then(res => {
      setThread(res.data);
      if (res.data.upvotes.includes(user.id)) {
        setUpUser(true);
      }
      if (res.data.downvotes.includes(user.id)) {
        setDownUser(true);
      }
      setVoteCount(res.data.upvotes.length - res.data.downvotes.length);

      console.log(res);
    });
    await api.getThreadComments(threadId).then(res => {
      setThreadComments(res.data);
      setLoading(false);
    });
  }, [pageRefresher]);
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <Header />
          <Grid container justify="center">
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
                        {Moment(thread.createdAt).format('DD MMMM, YYYY')}
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
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '15px 15px 25px 0px',
                    whiteSpace: 'pre-line',
                    cursor: 'default',
                    wordWrap: 'break-word',
                    alignItems: 'center',
                  }}
                >
                  <div
                    direction="column"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyItems: 'center',
                      alignItems: 'center',
                      width: '30px',
                      marginRight: '10px',
                    }}
                  >
                    <ArrowDropUpIcon
                      onClick={handleUpVote}
                      className={classes.arrowStyle}
                      style={
                        upUser == true ? { color: 'green' } : { color: 'black' }
                      }
                    />
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>
                      {' '}
                      {voteCount}
                    </span>
                    <ArrowDropDownIcon
                      className={classes.arrowStyle}
                      onClick={handleDownVote}
                      style={
                        downUser == true ? { color: 'red' } : { color: 'black' }
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flex: '1',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography style={{ marginBottom: '10px' }} variant="h6">
                      {thread.title}
                    </Typography>
                    <Typography>{thread.text}</Typography>
                  </div>
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
                    {thread.totalComments <= 1
                      ? `${thread.totalComments} Reply`
                      : `${thread.totalComments} Replies`}{' '}
                  </Typography>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    marginLeft: '15px',
                  }}
                >
                  <Grid
                    className={classes.innerContainer}
                    style={{
                      width: '80%',
                      display: 'flex',
                      alignContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <div className={classes.textFieldContainer}>
                      <Avatar alt={user.name} src={user.avatar} />
                      <Grid item xs={12} sm={10} style={{ flexGrow: 1 }}>
                        <TextField
                          style={{
                            width: '100%',
                            borderRadius: '10px',
                          }}
                          autoFocus
                          multiline
                          variant="outlined"
                          inputRef={commentRef}
                          InputProps={{
                            classes: { notchedOutline: classes.input },
                          }}
                        />
                        <Grid item container justify="flex-end">
                          <Button
                            style={{ paddingRight: '0px', marginRight: '0px' }}
                            onClick={handleSubmit}
                          >
                            Post
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                  {threadComments.map((el, index) => {
                    return (
                      <Comment
                        comment={el}
                        setPageRefresher={setPageRefresher}
                        key={index}
                      />
                    );
                  })}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
