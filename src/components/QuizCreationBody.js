import React, { useEffect, useRef, useState } from 'react';
import { QuizStage } from '.';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import { Grid, Paper } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { QuizPlay } from '../pages';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(5),
  },
  buttonStyle: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      color: 'white',
      'background-color': '#333f46',
    },
  },
  previewStyle: {
    width: '100%',
  },
}));

export default function QuizCreationBody(props) {
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  //preview
  const [preview, setPreview] = useState(false);
  const [previewBody, setPreviewBody] = useState(false);

  const [quizInfo, setQuizInfo] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const [submitVal, setSubmit] = useState('halt');
  const [error, setError] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  const fileStorage = [];

  const store = useRef([
    {
      stageId: 0,
      questions: [
        {
          stageId: 0,
          questionId: 0,
          title: '',
          points: 10,
        },
      ],
    },
  ]);

  const [quizBody, setQuizBody] = useState([
    {
      stageId: 0,
      questions: [],
    },
  ]);
  const dataFetch = useRef(false);
  const errorChecker = () => {
    let flag = true;
    store.current.map((st, i) => {
      st.questions.map((q, j) => {
        let checkType = true,
          val = true,
          checkTitle = true,
          checkVal = false;
        if (q.title == '') {
          store.current[i].questions[j].noTitleError = true;

          checkTitle = false;
        }
        if (q.type == undefined) {
          console.log('type is ', q.type);
          store.current[i].questions[j].noTypeError = true;
          checkTitle = false;
        } else if (q.type == 'text') {
          checkVal = true;
        } else if (q.options == undefined || q.options.length == 0) {
          store.current[i].questions[j].noOptionError = true;
        } else if (q.type == 'trueOrFalse') {
          checkVal = true;
        } else {
          if (q.options.length == 1) {
            store.current[i].questions[j].oneOptionError = true;
          } else if (quizInfo.isTest) {
            q.options.map(opt => {
              console.log(opt);
              checkVal = checkVal || opt.isAnswer;
            });
            if (checkVal == false) {
              console.log('getting unchecked error');
              store.current[i].questions[j].uncheckedError = true;
            } else {
              store.current[i].questions[j].uncheckedError = false;
            }
          } else {
            checkVal = true;
          }
        }
        console.log(
          'ques ',
          j,
          'titleflag',
          checkTitle,
          'typeFlag',
          checkType,
          ' valFlag',
          checkVal
        );
        val = checkTitle && checkType && checkVal;
        flag = flag && val;
        console.log('flag is ', flag);
      });
    });
    console.log('flag is', flag);
    return flag;
  };

  const handleSubmit = isPublished => {
    const flag = errorChecker();
    console.log('checker flag is', flag);
    if (flag == false) {
      setError(Math.random());
      return;
    }
    console.log('store is', store.current);
    var postBody = {
      stages: _.cloneDeep(store.current),
      isPublished: isPublished,
    };
    postBody.stages.map((item, i) => {
      postBody.stages[i].questions.map((q, j) => {
        if (q.hasOwnProperty('stageId'))
          delete postBody.stages[i].questions[j].stageId;
        if (q.hasOwnProperty('image') && q.image instanceof File) {
          fileStorage.push({
            stageId: i,
            questionId: j,
            image: q.image,
          });
          delete postBody.stages[i].questions[j].image;
        }
      });
    });
    console.log('postbody is ', postBody);

    if (editMode) {
      api
        .patchCompleteQuiz(id, postBody)
        .then(res => {
          console.log('patchbody response', res);
          const responseQuiz = res.data;

          fileStorage.map((element, index) => {
            console.log(element);
            let formData = new FormData();
            formData.append('image', element.image);
            formData.append('fileUpload', true);
            const id =
              responseQuiz.stages[element.stageId].questions[element.questionId]
                .id;

            fileUpload(id, formData);
          });
          history.push(`/quiz/${id}/home`);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      api
        .postCompleteQuiz(id, postBody)
        .then(res => {
          console.log('postbody response', res);
          const responseQuiz = res.data;

          fileStorage.map((element, index) => {
            console.log(element);
            let formData = new FormData();
            formData.append('image', element.image);
            formData.append('fileUpload', true);
            const id =
              responseQuiz.stages[element.stageId].questions[element.questionId]
                .id;

            fileUpload(id, formData);
          });
          history.push(`/quiz/${id}/home`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  const fileUpload = async (id, formData) => {
    await api
      .uploadQuestionImage(id, formData)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        // console.log(error);
      });
  };

  useEffect(async () => {
    await api
      .getQuiz(id)
      .then(res => {
        setQuizInfo(res.data);
        console.log('quiz info', res);
      })
      .catch(err => {
        console.log(err);
      });
    if (location.pathname.includes('edit')) {
      // console.log('edit');
      api.getCompleteQuiz(id).then(res => {
        console.log('completeQuiz', res.data.stages);
        const useTemp = [];
        const temp = res.data.stages;
        temp.map((t, i) => {
          useTemp.push({ stageId: i, questions: [] });
          temp[i].id = temp[i].stage.id;
          // delete temp[i].quiz;
          // delete temp[i].stage;
          temp[i].stageId = i;
          t.questions.map((q, j) => {
            temp[i].questions[j].questionId = j;
            // delete temp[i].questions[j].id;
            delete temp[i].questions[j].stage;
            delete temp[i].questions[j].serial;
            q.options.map((o, k) => {
              delete temp[i].questions[j].options[k]._id;
            });
            useTemp[i].questions.push('h' + Math.random());
          });
        });
        if (dataFetch.current == false) {
          store.current = temp;
          console.log('current is', store.current);
          dataFetch.current = true;
          setQuizBody(useTemp);
        }

        setEditMode(true);
        setLoading(false);
      });
    } else {
      console.log('creation');
      setLoading(false);
    }

    return () => {
      // cleanup;
    };
  }, []);

  const allFunctions = {
    handleBodyChange: message => {
      setQuizBody(presentState => {
        const body = [...presentState];
        body.push(message);
        return body;
      });
    },

    addStage: message => {
      setQuizBody(presentState => {
        const body = [...presentState];
        const temp = store.current.map(x => x.stageId);
        const newId = Math.max(...temp) + 1;
        const pos = store.current.findIndex(i => i.stageId == message);

        const newStage = {
          stageId: newId,
          questions: [
            {
              stageId: newId,
              questionId: 0,
              title: '',
              points: 10,
            },
          ],
        };

        store.current.splice(pos + 1, 0, newStage);
        body.splice(pos + 1, 0, { questions: ['h'] });
        return body;
      });
    },
    deleteStage: stageId => {
      if (store.current.length == 1) {
        return;
      }
      setQuizBody(presentState => {
        const body = [...presentState];
        const pos = store.current.findIndex(i => i.stageId == stageId);
        body.splice(pos, 1);
        store.current.splice(pos, 1);
        return body;
      });
    },
    deleteQuestion: (stageId, questionId) => {
      const pos = store.current.findIndex(i => i.stageId == stageId);
      const quesPos = store.current[pos].questions.findIndex(
        i => i.questionId == questionId
      );
      if (store.current[pos].questions.length == 1) {
        return;
      }
      setQuizBody(presentState => {
        const body = [...presentState];
        body[pos].questions.splice(quesPos, 1);
        store.current[pos].questions.splice(quesPos, 1);
        return body;
      });
    },

    questionChange: message => {
      const pos = store.current.findIndex(i => i.stageId == message.stageId);
      const quesPos = store.current[pos].questions.findIndex(
        i => i.questionId == message.questionId
      );
      store.current[pos].questions[quesPos] = message;

      console.log(store.current);
    },
    addQuestion: (stageId, questionId) => {
      const pos = store.current.findIndex(i => i.stageId == stageId);
      const temp = store.current[pos].questions.map(x => x.questionId);
      const newId = Math.max(...temp) + 1;
      const quesPos = store.current[pos].questions.findIndex(
        i => i.questionId == questionId
      );

      const newQuestion = {
        stageId: stageId,
        questionId: newId,
        title: '',
        points: 10,
      };

      // store.current[pos].questions.push(message);
      setQuizBody(presentState => {
        const body = [...presentState];
        store.current[pos].questions.splice(quesPos + 1, 0, newQuestion);

        body[pos].questions.splice(quesPos + 1, 0, 'h' + Math.random());

        return body;
      });
    },
    addTofileStorage: (stageId, questionId, imgFile) => {
      fileStorage.push({
        stageid: stageId,
        questionId: questionId,
        img: imgFile,
      });
    },
    removeFromFileStorage: (stageId, questionId) => {},
  };

  const enablePreview = () => {
    console.log(store.current);
    const pre = _.cloneDeep(store.current);
    pre.p = 'ssdfs';
    setPreviewBody(pre);
    setPreview(true);
    window.scroll(0, 0);
  };

  if (store.current && !loading) {
    return (
      <Grid container className={classes.root}>
        <Grid
          container
          spacing={0}
          // direction="column"
          alignItems="center"
          justify="center"
          // style={{ minHeight: '100vh' }}
        >
          {preview ? (
            <div className={classes.previewStyle}>
              {' '}
              <QuizPlay body={previewBody} info={quizInfo} />;
            </div>
          ) : (
            store.current.map((stage, i) => {
              return (
                <Grid item key={stage.stageId + Math.random()} md={12}>
                  <QuizStage
                    submitChecker={submitVal}
                    {...stage}
                    arrayIndex={i}
                    fullQues={store.current}
                    bodySetter={allFunctions}
                    quizInfo={quizInfo}
                  />
                </Grid>
              );
            })
          )}
        </Grid>

        <Grid container style={{ paddingBottom: '15px' }} justify="center">
          <Grid item>
            {preview ? (
              <Button
                variant="contained"
                classes={{
                  contained: classes.buttonStyle,
                }}
                onClick={e => setPreview(false)}
              >
                BACK TO EDIT
              </Button>
            ) : (
              <Grid>
                <Button
                  variant="contained"
                  classes={{
                    contained: classes.buttonStyle,
                  }}
                  onClick={enablePreview}
                >
                  PREVIEW
                </Button>
              </Grid>
            )}
          </Grid>
          {preview == false && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  classes={{
                    contained: classes.buttonStyle,
                  }}
                  onClick={e => handleSubmit(true)}
                >
                  PUBLISH
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  classes={{
                    contained: classes.buttonStyle,
                  }}
                  onClick={e => handleSubmit('false')}
                >
                  save as draft
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    );
  } else {
    return (
      <>
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
  }
}
