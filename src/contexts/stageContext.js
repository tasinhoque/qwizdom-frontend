import React, { createContext, useState } from 'react';
import { QuizCreationBody, QuizStage } from '../components';

export const stageContext = createContext();
export const StageProvider = (props) => {
  const [stage, setStage] = useState([
    {
      stageId: 1,
      questions: [
        {
          questionId: 1,
          questionName: 'stage 1, question 1',
        },
        {
          questionId: 2,
          questionName: 'stage 1, question 2',
        },
      ],
    },
  ]);

  return (
    <stageContext.Provider value={[stage, setStage]}>
      {/* <QuizStage /> */}
      <QuizCreationBody />
    </stageContext.Provider>
  );
};
