import { useState, useRef, useEffect } from 'react';
import { Button, Container, Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import api from '../api';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CreationDialog, Header, QuizHeader, ThreadCard } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {},

  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
    '& > *': {
      marginBottom: theme.spacing(3),
    },
  },

  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
  dummyContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    '& > *': {
      margin: '5px',
    },
  },
  textFieldStyle: {
    width: '70%',
    marginTop: '10px',
    background: '#a079795!important',
    border: '2px solid black',
  },
  dummyField: {
    width: '70px',
    background: '#b2bb9d57',
    borderRadius: '8px',
    flexGrow: 1,
    color: 'gray',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#60519833',
    },
  },
  input: {
    color: 'white',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    background: '#A07979',
  },
}));

export default function ForumPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [allThread, setAllThread] = useState(null);
  const { id } = useParams();
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [pageRefresher, setPageRefresher] = useState(9);
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);
  const [quizInfo, setQuizInfo] = useState('');

  const postFieldRef = useRef('');

  console.log('id is ', id);
  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
  };
  const textHandler = e => {
    console.log(postFieldRef.current.value);
  };
  const handlePost = async () => {
    const postBody = { text: postFieldRef.current.value };
    await api.postDiscussionThread(id, postBody).then(res => {
      console.log(res);
      postFieldRef.current.value = '';
      setPageRefresher(Math.random());
    });
  };

  useEffect(async () => {
    console.log('called');
    await api.getQuiz(id).then(res => {
      console.log(res);
      setQuizInfo(res.data);
    });
    await api
      .getAllDiscussionThread(id)
      .then(res => {
        console.log(res);
        setTotalPages(res.data.results.totalPages);
        setAllThread(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [pageRefresher]);
  console.log('on forum page');
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <Header />
          <Grid container justify="center">
            <Grid item md={8} sm={10}>
              <QuizHeader quiz={quizInfo} />
            </Grid>
          </Grid>
          <CreationDialog
            id={id}
            open={open}
            setOpen={setOpen}
            setPageRefresher={setPageRefresher}
          />
          <Grid style={{ paddingTop: '30px' }} container justify="center">
            <Grid
              container
              justify="center"
              direction="column"
              item
              // xs={10}
              className={classes.container}
              md={8}
              sm={10}
            >
              {/* <Grid item> */}
              <Paper
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  padding: '10px 15px 10px 15px',
                }}
              >
                <div className={classes.dummyContainer}>
                  <Avatar
                    style={{ width: '55px', height: '55px' }}
                    alt={user.name}
                    src={user.avatar}
                  />
                  <Container
                    onClick={() => {
                      setOpen(true);
                    }}
                    className={classes.dummyField}
                  >
                    Create your own thread
                  </Container>
                </div>
              </Paper>
              {/* </Grid> */}
              {allThread.map((th, index) => {
                return (
                  <Grid item key={index}>
                    <ThreadCard thread={th}></ThreadCard>
                  </Grid>
                );
              })}
              forum page
            </Grid>
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
              count={totalPages}
              onChange={pageChange}
              page={currentPageNum + 1}
              color="secondary"
            />
          </div>
        </div>
      )}
    </>
  );
}
