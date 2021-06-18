import React, { createContext, useState } from 'react';
import { QuizCreationBody, QuizStage } from '../components';

export const stageContext = createContext();
export const StageProvider = (props) => {
  const [stage, setStage] = useState([
    [
      {
        stageId: 1,
        questions: [
          {
            questionId: '1',
            questionName: 'this is the question',
          },
          { questionId: '2', questionName: 'web development' },
        ],
      },
    ],
    [
      {
        stageId: 2,
        questions: [
          {
            questionId: '1',
            questionName: 'this is the question',
          },
          { questionId: '2', questionName: 'web development' },
        ],
      },
    ],
  ]);

  return (
    <stageContext.Provider value={[stage, setStage]}>
      <QuizStage />
      <QuizCreationBody />
    </stageContext.Provider>
  );
};
