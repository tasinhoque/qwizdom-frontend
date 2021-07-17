import React, { useState, useEffect } from 'react';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Header } from '../components';
import { QuizReviewCard } from '../components';
import { Comments } from '../components';
import { Grid } from '@material-ui/core';
import { useParams, useHistory } from 'react-router';
import SubmissionDialog from '../components/SubmissionDialog';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {},
  quizAbout: {
    flex: '1',
    maxWidth: 1000,
    marginBottom: 30,
  },
  media: {
    height: 140,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  quizImg: {
    width: '100%',
    height: 'auto',
    flex: '1',
  },
  avatar: {
    backgroundColor: red[500],
  },
  quizContainer: {
    margin: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  avgRating: {
    // margin: theme.spacing(5),
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  reviewGrid: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipStyle: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  quizDescription: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    // paddingRight: theme.spacing(3),
  },
  imgBtnContainer: {
    position: 'relative',
    width: '100%',
  },
  quizImage: {
    width: '100%',
    // height: 'auto',
    maxHeight: 350,
  },
  subscribeBtn: {
    position: 'absolute',
    top: '2%',
    left: '2%',
    backgroundColor: '#555',
    color: 'white',
    fontSize: '12px',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  feedbackBtn: {
    display: 'none',
    position: 'absolute',
    top: '2%',
    right: '2%',
    backgroundColor: '#555',
    color: 'white',
    fontSize: '12px',
    padding: '8px 12px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  buttons: {
    justifyContent: 'center',
    fontSize: '12px',
    width: '85%',
    // paddingLeft: theme.spacing(3),
  },
  feedback: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
}));

export default function QuizHome(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState('');
  const [subbed, setSubbed] = useState(false);
  const [published, setPublished] = useState(false);
  const { id } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [creatorId, setCreatorId] = useState('');
  const [queryString, setQueryString] = useState(
    'isTimeBound=true&isScheduled=true&isTest=false'
  );
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState(null);
  const [revPage, setRevPage] = useState(1);

  const [diff, setDiff] = useState(null);

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }

    try {
      setLoading(true);

      // updateQueryString();
      const response = await api.getSubbedQuizzes();
      const { data: quizData } = await api.getQuiz(id);
      let revs = await api.fetchReviews(id, revPage);
      console.log(quizData);
      setQuiz(quizData);
      setPublished(quizData.isPublished);
      setCreatorId(quizData.creator.id);
      setReviews(revs.data.results);
      setTotalPages(revs.data.totalPages);

      var now = new Date().getTime();
      var st = new Date(quizData.startTime).getTime();
      var diff = st - now;
      setDiff({
        raw: diff,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });

      setQuizzes(response.data.results);
      response.data.results.map((e, i) => {
        if (e.id === id) {
          setSubbed(true);
          // console.log(e.id);
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    let revs = await api.fetchReviews(id, revPage);
    setReviews(revs.data.results);
  }, [revPage]);

  const subscribe = async e => {
    setSubbed(!subbed);
    let res = await api
      .subscribeQuiz(id)
      .then(res => {
        console.log(res);
        console.log(id);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  const publish = async e => {
    setPublished(!published);
    const publishBody = {
      isPublished: true,
    };
    let res = await api
      .publishDraft(id, publishBody)
      .then(res => {
        console.log(res);
        console.log(id);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  const popDialog = () => {
    console.log('pop called');
    setOpen(true);
  };

  const startQuiz = () => {
    // if (!quiz.isScheduled) {
    //   alert('quiz will start on schedule');
    //   return;
    // }
    props.history.push(`/quiz-play/${id}`);
  };

  const quizResult = () => {
    props.history.push(`/quiz-result/${id}`);
  };

  const allSubmissions = () => {
    props.history.push(`/all-submissions/${id}`);
  };

  const quizCreationRerouting = () => {
    props.history.push(`/edit-quiz/${id}`);
  };

  const pageChange = (_event, num) => {
    setRevPage(num);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '20px',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <SubmissionDialog
          id={id}
          open={open}
          setOpen={setOpen}
          caller="quizHome"
        />

        <Grid container className={classes.root} spacing={0}>
          <Grid item md={12} xs={12}>
            <Header />
          </Grid>
          <Grid
            container
            item
            md={12}
            xs={12}
            spacing={3}
            className={classes.quizContainer}
          >
            <Grid container item md={6} xs={12}>
              <Grid item md={12} xs={12}>
                <div className={classes.imgBtnContainer}>
                  <img src={quiz.coverImage} className={classes.quizImage} />
                  {creatorId !== user.id ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.subscribeBtn}
                      onClick={subscribe}
                    >
                      {subbed ? 'Unsubscribe' : 'Subscribe'}
                    </Button>
                  ) : !published ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.subscribeBtn}
                      onClick={publish}
                    >
                      Publish
                    </Button>
                  ) : null}
                  {creatorId !== user.id ? (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.feedbackBtn}
                      onClick={popDialog}
                    >
                      Give feedback
                    </Button>
                  ) : null}
                </div>
              </Grid>
              <Grid container item md={12} xs={12} spacing={0}>
                {creatorId != user.id ? (
                  <Grid
                    container
                    item
                    md={3}
                    xs={3}
                    className={classes.buttons}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      onClick={startQuiz}
                    >
                      Start Quiz
                    </Button>
                  </Grid>
                ) : (
                  <Grid
                    container
                    item
                    md={3}
                    xs={3}
                    className={classes.buttons}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      onClick={quizCreationRerouting}
                    >
                      EDIT QUIZ
                    </Button>
                  </Grid>
                )}
                <Grid container item md={3} xs={3} className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttons}
                    onClick={() => {
                      history.push(`/quiz/${id}/leaderboard`);
                    }}
                  >
                    Leaderboard
                  </Button>
                </Grid>
                {quiz.creator.id != user.id ? (
                  <Grid
                    container
                    item
                    md={3}
                    xs={3}
                    className={classes.buttons}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      onClick={quizResult}
                    >
                      My Submission
                    </Button>
                  </Grid>
                ) : (
                  <Grid
                    container
                    item
                    md={3}
                    xs={3}
                    className={classes.buttons}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.buttons}
                      onClick={allSubmissions}
                    >
                      All Submissions
                    </Button>
                  </Grid>
                )}
                <Grid container item md={3} xs={3} className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttons}
                  >
                    Forum
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item md={6} xs={12} direction="column">
              <Grid item>
                <Typography
                  variant="h4"
                  style={{ margin: '0px 0px 20px 20px' }}
                  component="p"
                >
                  {quiz.name}
                </Typography>
              </Grid>
              <Grid container item>
                <Grid item md={6} xs={12}>
                  <CardHeader
                    avatar={<Avatar src={quiz.creator.avatar}></Avatar>}
                    title={quiz.creator.name}
                    titleTypographyProps={{ variant: 'h5' }}
                  />
                </Grid>
                <Grid container item md={6} xs={12} alignItems="center">
                  <Grid item md={12} xs={12}>
                    <Typography
                      style={{
                        color: 'gray',
                        textAlign: 'right',
                      }}
                      component="p"
                    >
                      {!quiz.isScheduled
                        ? diff.days + ' days ' + diff.hours + ' hours '
                        : null}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.quizDescription} component="p">
                  {quiz.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid container item md={12} xs={12} spacing={3}>
            <Grid container item md={12} xs={12} className={classes.avgRating}>
              <Typography component="p">
                {quiz.totalParticipants} participant
              </Typography>
            </Grid>
            <Grid container item md={12} xs={12} className={classes.avgRating}>
              <Rating
                name="read-only"
                value={quiz.averageRating}
                precision={0.5}
                size="large"
                style={{
                  border: '2px',
                }}
                readOnly
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            md={12}
            xs={12}
            spacing={3}
            className={classes.reviewGrid}
          >
            <Grid container item spacing={3}>
              {reviews.length == 1 ? (
                <Grid item md={12} xs={12}>
                  <QuizReviewCard
                    name={reviews[0].user.name}
                    avatar={reviews[0].user.avatar}
                    rating={reviews[0].rating}
                    text={reviews[0].text}
                  />
                </Grid>
              ) : (
                reviews.map((e, i) => {
                  return (
                    <Grid item md={6} xs={12} key={i}>
                      <QuizReviewCard
                        name={e.user.name}
                        avatar={e.user.avatar}
                        rating={e.rating}
                        text={e.text}
                      />
                    </Grid>
                  );
                })
              )}
            </Grid>
            <Pagination
              count={totalPages}
              onChange={pageChange}
              page={revPage}
              color="secondary"
            />
          </Grid>
          {/* <Grid container justify="center"> */}
          {/*   <div style={{ width: '1000px' }}> */}
          {/*     <Comments fullUrl={'localhost:3000/quiz-home/' + id} id={id} /> */}
          {/*   </div> */}
          {/* </Grid> */}
        </Grid>
      </>
    );
  }
}
