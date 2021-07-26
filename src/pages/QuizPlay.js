import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header } from '../components';
import PlayQuestion from '../components/QuizPlay/PlayQuestion';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import produce from 'immer';
import TimerIcon from '@material-ui/icons/Timer';
import store from '../components/QuizPlay/store';
import { Grid, Paper, Typography } from '@material-ui/core';
import SubmissionDialog from '../components/SubmissionDialog';
import MyTimer from '../components/QuizPlay/MyTimer';

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: 'white',
    'background-color': '#333f46',
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
  imageStyle: {
    width: '100%',
    maxHeight: 280,
    objectFit: 'cover',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
  },
  questionStyle: {
    width: '70%',
  },
  barStyle: {
    fontWeight: '450',
    fontSize: '1.25rem',
    margin: theme.spacing(0, 2, 0, 2),
  },
  barContainer: {
    width: '70%',
    marginTop: '16px',
    padding: theme.spacing(0, 0, 2, 0),
  },
  timerContainer: {
    position: 'fixed',
    right: '5%',
    top: '40%',
    border: '3px solid black',
    height: '100px',
    width: '85px',
    borderRadius: '10%',
    paddingTop: '7px',
  },
  timerSize: {
    fontSize: '3.5rem',
  },
}));
export default function QuizPlay(props) {
  const [previewState, setPreviewState] = useState(props.body ? true : false);
  if (props.body) {
    console.log(props.body);
  }
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const fullQuiz = useRef(null);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  // const [currentStage, setCurrentStage] = useState(null);

  const [open, setOpen] = useState(false);
  const [quizInfo, setQuizInfo] = useState('');

  const currentStage = useRef('');
  const { id } = useParams();
  const history = useHistory();

  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
  };
  const [duration, setDuration] = useState(null);
  const time = new Date();

  const allFunctions = {
    questionChange: (qId, message) => {
      fullQuiz.current.stages[currentPageNum].questions[qId] = message;
      console.log(fullQuiz.current);
    },
  };
  const handleSubmit = async e => {
    if (previewState) return;
    const stageResponses = [];
    fullQuiz.current.stages.map((el, i) => {
      const stage = { stageId: el.stage.id };
      const responses = [];
      el.questions.map((q, j) => {
        const options = [];
        const question = {
          questionId: q.id,
        };
        if (q.text) {
          question.text = q.text;
        } else if (q.options) {
          q.options.map(o => {
            options.push(o.isAnswer);
          });

          question.options = options;
        }
        responses.push(question);
      });
      stage.responses = responses;
      stageResponses.push(stage);
    });
    // console.log(stageResponses);
    const postBody = {
      stageResponses: stageResponses,
    };
    console.log('postbody is', postBody);
    setOpen(true);

    await api
      .submitQuizPlay(id, postBody)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const arrayShuffler = array => {
    if (array.length <= 2) {
      return array;
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
    return array;
  };
  useEffect(async () => {
    if (previewState) {
      let stages = props.body;
      let count = 0;
      stages.map((e, i) => {
        e.questions.map((q, j) => {
          stages[i].questions[j].serial = count;
          count++;
          if (q.options) {
            q.options.map((o, k) => {
              stages[i].questions[j].options[k].isAnswer = false;
            });
          }
        });
      });
      const nextState = produce(stages, draftState => {
        // draftState.push({ todo: 'Tweet about it' });
        // draftState[1].done = true;
      });

      setQuizInfo(props.info);

      fullQuiz.current = {
        stages: nextState,
      };
      setTotalPages(stages.length);
      time.setSeconds(time.getSeconds() + props.info.duration * 60);
      setDuration(time);
      setLoading(false);
    } else {
      await api
        .getQuiz(id)
        .then(res => {
          console.log(res);
          setQuizInfo(res.data);
          if (res.data.isScheduled == true) {
            const startTime = new Date(res.data.startTime);
            // console.log(time, startTime);
            const endTime = new Date(
              startTime.getTime() + res.data.duration * 60000
            );
            startTime.setMinutes(startTime.getMinutes + res.data.duration);
            // console.log(endTime);

            const diff = Math.round((endTime - time) / 1000);
            // // console.log(diff.getSeconds());
            time.setSeconds(time.getSeconds() + diff);
            setDuration(time);
          } else if (
            res.data.isScheduled == false &&
            res.data.duration != undefined
          ) {
            time.setSeconds(time.getSeconds() + res.data.duration * 60);
            setDuration(time);
          }

          // console.log('quiz info', res);
        })
        .catch(err => {
          console.log(err);
        });
      api
        .getCompleteQuiz(id)
        .then(res => {
          console.log(res);
          res.data.stages.map((e, i) => {
            e.questions.map((q, j) => {
              if (q.options) {
                q.options.map((o, k) => {
                  res.data.stages[i].questions[j].options[k].isAnswer = false;
                });
              }
            });
          });

          console.log(res.data.stages);
          if (res.data.hasShuffle) {
            res.data.stages.map((e, i) => {
              res.data.stages[i].questions = arrayShuffler(
                res.data.stages[i].questions
              );
            });

            res.data.stages = arrayShuffler(res.data.stages);
          }
          let serialId = 0;
          res.data.stages.map((e, i) => {
            res.data.stages[i].questions.map((q, j) => {
              res.data.stages[i].questions[j].serial = serialId;
              serialId++;
            });
          });

          // console.log(res.data.stages);

          fullQuiz.current = res.data;
          currentStage.current = res.data.stages[0];
          setTotalPages(res.data.stages.length);

          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [props]);

  return (
    <>
      {!previewState && <Header />}
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <SubmissionDialog
              id={id}
              open={open}
              setOpen={setOpen}
              caller="quizPlay"
            />
            {quizInfo.isTest && duration && !previewState && (
              <div className={classes.timerContainer}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {' '}
                  <TimerIcon classes={{ root: classes.timerSize }} />
                </div>
                <MyTimer expiryTimestamp={duration} expireFunc={handleSubmit} />{' '}
              </div>
            )}

            <Grid container justify="center">
              <Paper elevation={7} className={classes.barContainer}>
                <Grid container>
                  {quizInfo.coverImage && (
                    <img
                      src={quizInfo.coverImage}
                      className={classes.imageStyle}
                    />
                  )}
                </Grid>

                <Grid container justify="center" style={{ marginTop: '10px' }}>
                  <Grid container item xs={12} md={8} direction="column">
                    <Typography gutterBottom className={classes.barStyle}>
                      Quiz: {quizInfo.name}
                    </Typography>
                    <Typography gutterBottom className={classes.barStyle}>
                      Creator: {quizInfo.creator.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    md={4}
                    align="flex-end"
                    direction="column"
                  >
                    {quizInfo.isTest && quizInfo.totalPoints && (
                      <Typography
                        gutterBottom
                        className={classes.barStyle}
                        // align="right"
                      >
                        Total Points: {quizInfo.totalPoints}
                      </Typography>
                    )}
                    {quizInfo.duration && (
                      <Typography
                        gutterBottom
                        className={classes.barStyle}
                        // align="right"
                      >
                        Duration: {quizInfo.duration} Min
                      </Typography>
                    )}
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
                Section {currentPageNum + 1} of {totalPages}
              </Typography>
            </div>

            {fullQuiz.current.stages[currentPageNum].questions.map(
              (element, index) => {
                return (
                  <PlayQuestion
                    key={
                      `StageId ${currentPageNum}index${index} ` + Math.random()
                    }
                    allFunctions={allFunctions}
                    qId={index}
                    question={element}
                    previewState={previewState}
                    quizInfo={quizInfo}
                  />
                );
              }
            )}
            {currentPageNum + 1 == totalPages && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '70%',
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    {' '}
                    Submit Quiz
                  </Button>
                </div>
              </div>
            )}
            <Pagination
              style={{
                margin: '20px 0px 50px 0px',
                display: 'flex',
                justifyContent: 'center',
              }}
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
