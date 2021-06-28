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

import { Header } from '../components';
import { QuizReviewCard } from '../components';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';

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
  reviewContainer: {
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
    margin: theme.spacing(2),
    // paddingRight: theme.spacing(3),
  },
  imgBtnContainer: {
    position: 'relative',
    width: '100%',
  },
  quizImage: {
    width: '100%',
    height: 'auto',
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
  buttons: {
    justifyContent: 'center',
    fontSize: '12px',
    width: '85%',
    // paddingLeft: theme.spacing(3),
  },
}));

export default function QuizHome(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState('');
  const { id } = useParams();

  useEffect(async () => {
    setLoading(true);
    api
      .getQuiz(id)
      .then(res => {
        console.log(res.data);
        setQuiz(res.data);
        setLoading(false);
      })
      .catch(e => {});
  }, []);

  const subscribe = async e => {
    let res = await api
      .subscribeQuiz(id)

      .then(res => {
        console.log(res);
        // console.log(id);
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.subscribeBtn}
                  onClick={subscribe}
                >
                  Subscribe
                </Button>
              </div>
            </Grid>
            <Grid container item md={12} xs={12} spacing={0}>
              <Grid container item md={3} xs={3} className={classes.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={subscribe}
                >
                  Start Quiz
                </Button>
              </Grid>
              <Grid container item md={3} xs={3} className={classes.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={subscribe}
                >
                  Leaderboard
                </Button>
              </Grid>
              <Grid container item md={3} xs={3} className={classes.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={subscribe}
                >
                  My Submission
                </Button>
              </Grid>
              <Grid container item md={3} xs={3} className={classes.buttons}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.buttons}
                  onClick={subscribe}
                >
                  Forum
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid conainer item md={6} xs={12}>
            <Grid container spacing={3} item>
              <Typography
                variant="h4"
                style={{ margin: '0px 0px 20px 20px' }}
                component="p"
              >
                {quiz.name}
              </Typography>
              <Grid container item md={12} xs={12} spacing={3}>
                <Grid item md={6} xs={12}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={quiz.creator.avatar}
                        // src="assets/images/marcos.png"
                        // className={classes.avatar}
                      ></Avatar>
                    }
                    title="Marcos Marshal"
                    titleTypographyProps={{ variant: 'h5' }}
                    // subheader="September 14, 2016"
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
                      1 month ago
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography className={classes.quizDescription} component="p">
                {quiz.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item md={12} xs={12} spacing={3}>
          <Grid container item md={12} xs={12} className={classes.avgRating}>
            <Typography component="p">101 participants</Typography>
          </Grid>
          <Grid container item md={12} xs={12} className={classes.avgRating}>
            <Rating
              name="read-only"
              value={2}
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
          className={classes.reviewContainer}
        >
          <Grid item md={6} xs={12}>
            <QuizReviewCard />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuizReviewCard />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuizReviewCard />
          </Grid>
          <Grid item md={6} xs={12}>
            <QuizReviewCard />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
