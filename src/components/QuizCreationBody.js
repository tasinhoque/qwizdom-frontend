import React, { useContext, useEffect, useRef, useState } from 'react';
import { stageContext } from '../contexts/stageContext';
import { QuizStage } from '.';
import QuestionComponent from './QuestionComponent';
import { isUndefined } from 'lodash';

export default function QuizCreationBody() {
  const [submitVal, setSubmit] = useState('halt');
  const handleSubmit = () => {
    setSubmit('submit');
    console.log(store.current);
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

    questionChange: message => {
      const pos = store.current.findIndex(i => i.stageId == message.stageId);
      store.current[pos].questions[message.questionId] = message;

      console.log(store.current);
    },
    addQuestion: message => {
      const pos = store.current.findIndex(i => i.stageId == message.stageId);

      store.current[pos].questions.push(message);
      setQuizBody(presentState => {
        const body = [...presentState];
        return body;
      });
    },
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
      </div>
    );
  } else {
    return <div>loading</div>;
  }
}
