import React, { useContext, useState } from 'react';
import { stageContext } from '../contexts/stageContext';
import { QuizStage } from '.';

export default function QuizCreationBody() {
  const [value, setValue] = useContext(stageContext);
  const [submit, setSubmit] = useState(false);
  console.log(value);
  const handleSubmit = () => {
    setSubmit(true);
  };
  if (value) {
    return (
      <div>
        <button onClick={handleSubmit}> submit full page</button>

        {value.map((stage) => {
          return (
            <QuizStage
              // submit={submit}
              {...stage}
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
