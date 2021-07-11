import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, ResultQuestion } from '../components';
import PlayQuestion from '../components/QuizPlay/PlayQuestion';
import Button from '@material-ui/core/Button';
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
  headerStyle: {
    width: '70%',
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stageTitle: {
    fontWeight: '420',
    fontSize: '1.7em',
    marginTop: '10px',
    marginBottom: '-14px',
  },
  questionStyle: {
    width: '70%',
  },
  imageStyle: {
    width: '100%',
    maxHeight: 250,
  },
  quizName: {
    // margin: theme.spacing(3, 0, 0, 1),
    margin: theme.spacing(0, 2, 0, 2),
  },
}));
export default function ResultPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const fullQuiz = useRef(null);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [quizInfo, setQuizInfo] = useState('');
  const { id } = useParams();
  const history = useHistory();
  // const id = '60dc856ecc4ccb376c3d034f';

  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
    // console.log(fullQuiz.current.stages[num - 1]);
  };
  useEffect(async () => {
    api
      .getQuizResult(id)
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
        history.push(`/quiz-home/${id}`);
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Paper className={classes.headerStyle} elevation={7}>
                <Grid container>
                  {fullQuiz.current.quiz.coverImage && (
                    <img
                      src={fullQuiz.current.quiz.coverImage}
                      className={classes.imageStyle}
                    />
                  )}
                </Grid>
                <Grid container>
                  <Grid
                    container
                    style={{ marginTop: '10px' }}
                    item
                    xs={6}
                    direction="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.quizName}
                    >
                      Quiz : {fullQuiz.current.quiz.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.quizName}
                    >
                      Creator: {fullQuiz.current.quiz.creator.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    style={{ marginTop: '10px ' }}
                    item
                    xs={6}
                    direction="column"
                  >
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.quizName}
                      align="right"
                    >
                      Point : {fullQuiz.current.totalPoints}/
                      {fullQuiz.current.quiz.totalPoints}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
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
