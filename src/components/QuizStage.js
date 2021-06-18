import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { stageContext } from '../contexts/stageContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(150),
      height: theme.spacing(16),
    },
  },
}));

export default function QuizStage(props) {
  const classes = useStyles();
  const [value, setValue] = useContext(stageContext);
  const dummy = JSON.parse(JSON.stringify(value));

  // console.log('props is ', props[0].stageId);
  console.log(value[0][0].questions[0].questionName);

  const deleteStage = () => {
    dummy.pop();
    setValue(dummy);
    console.log(props);
  };

  const addStage = (e) => {
    const newStage = {
      stageId: 3,
      questions: [
        {
          questionId: '4',
          questionName: 'this is good',
        },
      ],
    };
    dummy.push(newStage);
    setValue(dummy);
  };
  return (
    <>
      <div className={classes.root}>
        <Paper elevation={2}>
          <button onClick={addStage}> next stage</button>
          <button onClick={deleteStage}> delete stage</button>

          <p>{value[0][0].questions[0].questionName}</p>
        </Paper>
      </div>
    </>
  );
}
