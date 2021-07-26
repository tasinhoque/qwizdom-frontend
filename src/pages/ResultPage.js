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
import { useLocation } from 'react-router-dom';

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
export default function ResultPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const fullQuiz = useRef(null);
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [quizInfo, setQuizInfo] = useState('');
  const history = useHistory();
  const { id, userId } = useParams();

  const location = useLocation();
  const path = location.pathname;
  let sumbissionView = false;
  // NOTE: changer: enan -- reroute
  // if (path.includes('user-submission')) {
  //   sumbissionView = true;
  // }
  if (userId != null) {
    sumbissionView = true;
  }
  const [creatorViewState, setCreatorViewState] = useState(sumbissionView);

  // if (path.includes('user-submission')) {
  //   const { qId, userId } = useParams();
  // } else {
  //   const { id } = useParams();
  //   console.log('id is', id);
  // }

  // const id = '60dc856ecc4ccb376c3d034f';

  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
    // console.log(fullQuiz.current.stages[num - 1]);
  };
  useEffect(async () => {
    // if (path.includes('user-submission')) {
    if (userId != null) {
      api.getEvaluationScript(id, userId).then(res => {
        fullQuiz.current = res.data;
        console.log(fullQuiz.current);
        setTotalPages(res.data.stageResponses.length);

        //   // console.log(fullQuiz.current.stages[currentPageNum].questions);
        setLoading(false);
      });
    } else {
      api
        .getQuizResult(id)
        .then(res => {
          console.log(res);
          fullQuiz.current = res.data;
          console.log(fullQuiz.current.isEvaluated);
          console.log(fullQuiz.current);
          setTotalPages(res.data.stageResponses.length);
          setLoading(false);
        })
        .catch(error => {
          history.push(`/quiz/${id}/home`);
          console.log(error);
        });
    }
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
                  <Grid container item xs={12} md={8} direction="column">
                    <Typography gutterBottom className={classes.barStyle}>
                      Quiz: {fullQuiz.current.quiz.name}
                    </Typography>
                    <Typography gutterBottom className={classes.barStyle}>
                      {creatorViewState ? (
                        <>Participant: {fullQuiz.current.responder.name}</>
                      ) : (
                        <>Creator: {fullQuiz.current.quiz.creator.name}</>
                      )}
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
                    {fullQuiz.current.quiz.isTest && (
                      <>
                        <Typography
                          gutterBottom
                          className={classes.barStyle}
                          // align="right"
                        >
                          Points:
                          {fullQuiz.current.isEvaluated
                            ? `${fullQuiz.current.totalPoints}/${fullQuiz.current.quiz.totalPoints}`
                            : 'Pending'}
                          {/* {fullQuiz.current.totalPoints}/
                          {fullQuiz.current.quiz.totalPoints} */}
                        </Typography>
                        <Typography
                          gutterBottom
                          className={classes.barStyle}
                          // align="right"
                        >
                          Duration: {fullQuiz.current.quiz.duration} Min
                        </Typography>
                      </>
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
            {fullQuiz.current.stageResponses[currentPageNum].responses.map(
              (element, index) => {
                return (
                  <ResultQuestion
                    key={
                      `StageId ${currentPageNum}index${index} ` + Math.random()
                    }
                    qId={index}
                    element={element}
                    fullQuiz={fullQuiz.current}
                  />
                );
              }
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
