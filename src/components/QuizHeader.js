import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ComponentProps,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
  container: {
    paddingTop: theme.spacing(5),
    // paddingBottom: theme.spacing(10),
  },
  questionTitle: {
    marginBottom: theme.spacing(5),
  },
  questionOptions: {},
  question: {
    justifyContent: 'center',
  },
  quizheader: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  paper: {
    minWidth: '80%',
    margin: theme.spacing(3, 0, 1, 0),
  },
  coverImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  box: {
    // marginTop: '-20px',
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

export default function QuizHeader(props) {
  const classes = useStyles();

  const quiz = props.quiz;
  return (
    <Paper className={classes.paper}>
      <img
        src={quiz.coverImage}
        width="400px"
        className={classes.coverImage}
        alt=""
      />
      <Grid
        container
        justify="space-between"
        alignItems="center"
        direction="row"
        className={classes.box}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          item
          xs={12}
          sm={6}
        >
          <Typography
            variant="h4"
            component="div"
            className={classes.quizTitle}
          >
            {quiz.name}
          </Typography>
          <Typography className={classes.quizInfo}>
            Creator: {quiz.creator.name}
          </Typography>
        </Grid>
        <Grid container direction="column" item xs={12} sm={6}>
          <Grid container justify="flex-end" item>
            <Typography className={classes.quizInfo}>
              Total Participants: {quiz.totalParticipants || 0}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
