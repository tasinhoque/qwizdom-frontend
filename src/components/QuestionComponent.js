import React, { useRef, useState, useEffect, useContext } from 'react';
import { TextField } from '@material-ui/core';
import { stageContext } from '../contexts/stageContext';

export default function QuestionComponent(props) {
  const [value, setValue] = useContext(stageContext);
  const valueRef = useRef('');

  const [textInput, setTextInput] = useState('');
  const [submit, setSubmit] = useState(props.submit);
  const inputChange = (e) => {
    setTextInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log('submit called');
    // const dummy = JSON.parse(JSON.stringify(value));
    const dummy = value;
    console.log(valueRef.current.value);
    dummy[props.stageId - 1].questions[props.questionId - 1].questionName =
      valueRef.current.value;
    if (submit) {
      console.log(props.stageId - 1);
      console.log(props.questionId - 1);
      localStorage.setItem('dummy', JSON.stringify(dummy));
    }
  }, [submit]);
  return (
    <div>
      <form>
        <TextField
          style={{ width: '60%' }}
          variant="filled"
          margin="normal"
          required
          fullWidth
          // id="email"
          label="Question Text"
          name="email"
          // autoComplete="email"
          autoFocus
          inputRef={valueRef}
          onChange={inputChange}
        />
      </form>
      {/* <p> {props.questionName}</p> */}
      {/* <p> props stage is {props.stageId}</p> */}
    </div>
  );
}
