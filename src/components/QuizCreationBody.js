import React, { useContext, useEffect, useRef, useState } from 'react';
import { stageContext } from '../contexts/stageContext';
import { QuizStage } from '.';
import QuestionComponent from './QuestionComponent';
import { isUndefined, cloneDeep } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';

const useStyles = makeStyles(theme => ({
  buttonStyle: {
    color: 'white',
    'background-color': '#333f46',
  },
}));

export default function QuizCreationBody() {
  const classes = useStyles();

  const [submitVal, setSubmit] = useState('halt');
  const { id } = useParams();
  const fileStorage = [];

  const handleSubmit = async isPublished => {
    var postBody = {
      quizId: id,
      stages: _.cloneDeep(store.current),
      isPublished: isPublished,
    };
    postBody.stages.map((item, i) => {
      postBody.stages[i].questions.map((q, j) => {
        if (q.hasOwnProperty('stageId'))
          delete postBody.stages[i].questions[j].stageId;
        if (q.hasOwnProperty('image')) {
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

    await api
      .postCompleteQuiz(postBody)
      .then(res => {
        console.log(res);
        const responseQuiz = res.data;
        fileStorage.map((element, index) => {
          let formData = new FormData();
          formData.append('image', element.image);
          formData.append('fileUpload', true);
          const id =
            responseQuiz.stages[element.stageId].questions[element.questionId]
              .id;

          fileUpload(id, formData);
        });
      })
      .catch(error => {
        console.log(error);
      });
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

  // 'store useref' is the storage for all stages and quizzes.
  // userefs don't get rendered if any change happens
  // so while typing in textfield it won't get rendered after every stroke

  //  But after new stage or delete stage we need to render again, so
  //  another usestate container quizbody is tracked simultaneously holding
  //  only array size and question size  . it gets updated only  add or delete stage,questions
  //  also renders
  const store = useRef([
    {
      stageId: 0,
      questions: [
        {
          questionId: 0,
          title: 'first question',
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
              questionId: 0,
              title: 'new one',
            },
          ],
        };

        store.current.splice(pos + 1, 0, newStage);
        body.splice(pos + 1, 0, newStage);
        return body;
      });
    },
    deleteStage: stageId => {
      setQuizBody(presentState => {
        const body = [...presentState];
        const pos = store.current.findIndex(i => i.stageId == stageId);
        body.splice(pos, 1);
        store.current.splice(pos, 1);
        return body;
      });
    },
    addQuestion: (stageId, questionId) => {
      setQuizBody(presentState => {
        const body = [...presentState];
        console.log(body);
        body[stageId].questions.splice(questionId, 1);
        store.current[stageId].questions.splice(questionId, 1);
        return body;
      });
    },
    deleteQuestion: (stageId, questionId) => {
      console.log(stageId, questionId);
      setQuizBody(presentState => {
        const body = [...presentState];
        console.log(body);
        body[stageId].questions.splice(questionId, 1);
        store.current[stageId].questions.splice(questionId, 1);
        return body;
      });
    },

    questionChange: message => {
      const pos = store.current.findIndex(i => i.stageId == message.stageId);
      store.current[pos].questions[message.questionId] = message;

      // console.log(store.current);
    },
    addQuestion: (stageId, questionId) => {
      const pos = store.current.findIndex(i => i.stageId == stageId);
      const temp = store.current[pos].questions.map(x => x.questionId);
      const newId = Math.max(...temp) + 1;

      const newQuestion = {
        stageId: stageId,
        questionId: newId,
        title: 'new one',
      };

      // store.current[pos].questions.push(message);
      setQuizBody(presentState => {
        const body = [...presentState];
        store.current[stageId].questions.splice(pos + 1, 0, newQuestion);
        body[pos].questions.splice(pos + 1, 0, 'h');

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

  if (store.current) {
    return (
      <div>
        <button onClick={handleSubmit}> submit full page</button>

        {store.current.map(stage => {
          return (
            <QuizStage
              submitChecker={submitVal}
              {...stage}
              bodySetter={allFunctions}
              key={stage.stageId}
            />
          );
        })}

        <div>
          <Button
            variant="contained"
            classes={{
              contained: classes.buttonStyle,
            }}
            onClick={e => handleSubmit(true)}
          >
            submit now
          </Button>
          <Button
            variant="contained"
            classes={{
              containedPrimary: classes.buttonStyle,
            }}
            onClick={e => handleSubmit('false')}
          >
            save as draft
          </Button>
        </div>
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}
