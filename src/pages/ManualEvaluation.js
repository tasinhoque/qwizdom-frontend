import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Height } from '@material-ui/icons';
const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: 'white',
    'background-color': '#333f46',
  },
  barContainer: {
    width: '70%',
    marginTop: '16px',
    padding: theme.spacing(0, 0, 2, 0),
  },
  barStyle: {
    fontWeight: '450',
    fontSize: '1.25rem',
    margin: theme.spacing(0, 2, 0, 2),
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stageTitle: {
    fontWeight: '420',
    fontSize: '1.7em',
    marginTop: '13px',
    marginBottom: '-8px',
  },
  questionStyle: {
    width: '70%',
  },
  imageStyle: {
    width: '100%',
    maxHeight: 250,
    objectFit: 'cover',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
  quizName: {
    // margin: theme.spacing(3, 0, 0, 1),
    margin: theme.spacing(0, 2, 0, 2),
  },
}));

export default function ManualEvaluation() {
  const { quizId, userId } = useParams();
  console.log('quizId', quizId);
  console.log('userId', userId);

  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const fullQuiz = useRef(null);

  useEffect(async () => {
    api
      .getEvaluationScript(quizId, userId)
      .then(res => {
        console.log(res);
        //   res.data.stages.map((e, i) => {
        //     e.questions.map((q, j) => {
        //       if (q.options) {
        //         q.options.map((o, k) => {
        //           res.data.stages[i].questions[j].options[k].isAnswer = false;
        //         });
        //       }
        //     });
        //   });
        fullQuiz.current = res.data;
        console.log(fullQuiz.current);
        setTotalPages(res.data.stageResponses.length);

        //   // console.log(fullQuiz.current.stages[currentPageNum].questions);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header />
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <Grid container justify="center">
              <Paper className={classes.barContainer} elevation={7}>
                <Grid container>
                  {fullQuiz.current.quiz.coverImage && (
                    <img
                      src={fullQuiz.current.quiz.coverImage}
                      className={classes.imageStyle}
                    />
                  )}
                </Grid>
                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Grid container item xs={6} direction="column">
                    <Typography gutterBottom className={classes.barStyle}>
                      Quiz : {fullQuiz.current.quiz.name}
                    </Typography>
                    <Typography gutterBottom className={classes.barStyle}>
                      Creator: {fullQuiz.current.quiz.creator.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={6}
                    align="flex-end"
                    direction="column"
                  >
                    <Typography
                      gutterBottom
                      className={classes.barStyle}
                      align="right"
                    >
                      Points : {fullQuiz.current.totalPoints.toFixed(2)}/
                      {fullQuiz.current.quiz.totalPoints}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              <Typography
                style={{ width: '70%' }}
                className={classes.stageTitle}
                align="center"
              >
                Stage {currentPageNum + 1} of {totalPages}
              </Typography>
            </div>
            {fullQuiz.current.stageResponses[currentPageNum].responses.map(
              (element, index) => {
                return (
                  <ResultQuestion
                    key={
                      `StageId ${currentPageNum}index${index} ` + Math.random()
                    }
                    qId={index}
                    element={element}
                  />
                );
              }
            )}

            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
              count={totalPages}
              onChange={pageChange}
              page={currentPageNum + 1}
              color="secondary"
            />
          </div>
        )}
      </div>
    </>
  );
}
