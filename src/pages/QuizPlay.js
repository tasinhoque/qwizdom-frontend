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

import store from '../components/QuizPlay/store';
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
  questionStyle: {
    width: '70%',
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
  const currentStage = useRef('');
  const { id } = useParams();
  const history = useHistory();

  // const id = '60dc04d501176c4f08da0dc6';
  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
    // console.log(fullQuiz.current.stages[num - 1]);
  };
  const allFunctions = {
    questionChange: (qId, message) => {
      // const pos = store.current.findIndex(i => i.stageId == message.stageId);
      fullQuiz.current.stages[currentPageNum].questions[qId] = message;
      console.log(fullQuiz.current);
    },
  };
  const handleSubmit = async e => {
    if (previewState) return;
    console.log('before response', fullQuiz.current);
    const stageResponses = [];
    fullQuiz.current.stages.map((el, i) => {
      const stage = { stageId: el.stage.id };
      const responses = [];
      el.questions.map((q, j) => {
        const options = [];
        const question = {
          questionId: q.id,
        };
        if (q.options) {
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
    console.log(postBody);
    await api
      .submitQuizPlay(id, postBody)
      .then(res => {
        console.log(res);
        history.push(`/quiz-home/${id}`);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(async () => {
    if (previewState) {
      let stages = props.body;
      stages.map((e, i) => {
        e.questions.map((q, j) => {
          if (q.options) {
            q.options.map((o, k) => {
              stages[i].questions[j].options[k].isAnswer = false;
            });
          }
        });
      });

      fullQuiz.current = {
        info: 'habijabi',
        stages: stages,
      };
      setTotalPages(stages.length);
      setLoading(false);
    } else {
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
          // console.log(res.data.stages);

          fullQuiz.current = res.data;
          currentStage.current = res.data.stages[0];
          setTotalPages(res.data.stages.length);

          // console.log(fullQuiz.current.stages[currentPageNum].questions);
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
