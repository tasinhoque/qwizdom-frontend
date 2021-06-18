import React, { useContext } from 'react';
import { stageContext } from '../contexts/stageContext';
import { QuizStage } from '.';

export default function QuizCreationBody() {
  const [value, setValue] = useContext(stageContext);
  console.log(value);
  return (
    <div>
      {value.map((stage) => {
        return <QuizStage {...stage} key={stage.stageId} />;
      })}
    </div>
  );
}
