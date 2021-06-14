import React from 'react';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

import { Header } from '../components';
import { QuizReviewCard } from '../components';
import { SingleCard } from '../components';
import { Grid } from '@material-ui/core';
import { DashboardBody } from '../components';

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    backgroundColor: red[500],
  },
  quizContainer: {
    margin: '50px',
  },
  reviewContainer: {
    margin: '50px',
    // padding: '20px',
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
    paddingRight: theme.spacing(3),
  },
}));

export default function QuizHome() {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid container item xs={12}>
        {/* <Grid container spacing={3}> */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid
          container
          item
          xs={12}
          spacing={3}
          className={classes.quizContainer}
        >
          <Grid item xs={6}>
            <img
              src="assets/images/quiz.png"
              style={{ width: '100%', height: 'auto', flex: '1' }}
            />
          </Grid>

          <Grid conainer item xs={6}>
            <Grid container spacing={3}>
              <Typography
                variant="h4"
                style={{ margin: '0px 0px 20px 20px' }}
                component="p"
              >
                Web Development Fundamentals
              </Typography>
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={6}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src="assets/images/marcos.png"
                        // className={classes.avatar}
                      ></Avatar>
                    }
                    title="Marcos Marshal"
                    titleTypographyProps={{ variant: 'h5' }}
                    // subheader="September 14, 2016"
                  />
                </Grid>
                <Grid container item xs={6} alignItems="center">
                  <Grid item xs={12}>
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
            <Grid container spacing={3}>
              <Typography className={classes.quizDescription} component="p">
                <p>
                  {' '}
                  In this class you will learn how to code HTML and CSS, the
                  coding languages used to create webpages. We focus on best
                  practices for structuring the content of your webpages with
                  HTML and then styling the content with CSS.{' '}
                </p>
                <p>
                  {' '}
                  Once you have the basics under your belt, you will move on to
                  real-world page layout. You will learn text and link styles,
                  centered page layout, background images, CSS-based navigation,
                  forms, uploading files via FTP, and much more. We will provide
                  you with the content and prepared images for use in these
                  projects but this training will give you hands-on practice
                  coding websites from scratch all the way through uploading
                  them to make them live.{' '}
                </p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={12}
        spacing={3}
        className={classes.reviewContainer}
      >
        <Grid item xs={6}>
          <QuizReviewCard />
        </Grid>
        <Grid item xs={6}>
          <QuizReviewCard />
        </Grid>
        <Grid item xs={6}>
          <QuizReviewCard />
        </Grid>
        <Grid item xs={6}>
          <QuizReviewCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
