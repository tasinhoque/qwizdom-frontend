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

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: 'white',
    'background-color': '#333f46',
  },
  headerStyle: {
    flexGrow: 1,
  },
  questionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionStyle: {
    width: '70%',
  },
  quizName: {
    margin: theme.spacing(3, 0, 0, 1),
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
      .getQuiz(id)
      .then(res => {
        console.log(res.data);
        setQuizInfo(res.data);
      })
      .catch(error => {
        console.log(error);
      });
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
        fullQuiz.current = res.data.stageResponses;
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
            <div>
              <Paper className={classes.headerStyle} elevation={3}>
                <Grid container direction="row">
                  <Grid item>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={classes.quizName}
                    >
                      {quizInfo.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" gutterBottom>
                      Quiz Name :{quizInfo.name}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </div>
            {fullQuiz.current[currentPageNum].responses.map(
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
