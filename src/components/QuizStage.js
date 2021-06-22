import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import { stageContext } from '../contexts/stageContext';
import QuestionComponent from './QuestionComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(150),
      minHeight: theme.spacing(16),
    },
  },
}));

export default function QuizStage(props) {
  const classes = useStyles();

  // console.log(props);
  const deleteStage = () => {
    // const dummy = JSON.parse(JSON.stringify(value));
    // const pos = dummy.findIndex((i) => i.stageId == props.stageId);
    // dummy.splice(pos, 1);
    // setValue(dummy);

    props.bodySetter.deleteStage(props.stageId);
  };

  const addStage = (e) => {
    // const dummy = JSON.parse(JSON.stringify(value));
    // const temp = dummy.map((x) => x.stageId);
    // const newId = Math.max(...temp) + 1;
    // const newStage = {
    //   stageId: newId,
    //   questions: [],
    // };
    // const pos = dummy.findIndex((i) => i.stageId == props.stageId);
    // dummy.splice(pos + 1, 0, newStage);
    // setValue(dummy);

    console.log('add stage called');
    props.bodySetter.addStage(props.stageId);
  };

  const addQuestion = (e) => {
    // const dummy = JSON.parse(JSON.stringify(value));
    // const pos = dummy.findIndex((i) => i.stageId == props.stageId);

    const temp = props.questions.map((x) => x.questionId);
    const newId = Math.max(...temp) + 1;

    const newQuestion = {
      stageId: props.stageId,
      questionId: newId,
      questionLabel: 'new one',
    };
    props.bodySetter.addQuestion(newQuestion);
  };

  if (props.questions != undefined) {
    return (
      <>
        <div className={classes.root}>
          <Paper elevation={2}>
            <p> stage id is {props.stageId}</p>
            <button onClick={addStage}> New stage</button>
            <button onClick={deleteStage}> delete stage</button>
            <button onClick={addQuestion}>add question</button>

            {props.questions.map((q) => {
              return (
                <QuestionComponent
                  {...q}
                  submitChecker={props.submitChecker}
                  stageId={props.stageId}
                  questionChange={props.bodySetter.questionChange}
                  key={q.questionId}
                />
              );
            })}
          </Paper>
        </div>
      </>
    );
  } else {
    return <div> 'undefined'</div>;
  }
}
