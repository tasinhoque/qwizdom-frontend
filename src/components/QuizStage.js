import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import { stageContext } from '../contexts/stageContext';
import QuestionComponent from './QuestionComponent';
import { wrap } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',

    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(150),
    //   minHeight: theme.spacing(2),
    // },
  },
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '95%',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(150),
      minHeight: theme.spacing(2),
    },
  },
  paperStyle: {
    backgroundColor: 'aliceBlue',
    margin: '20px 0px 40px 0px',
  },
  iconStyle: {
    cursor: 'pointer',
  },

  iconContainer: {
    position: 'absolute',
    top: '-18px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function QuizStage(props) {
  const classes = useStyles();

  // console.log(props);
  const deleteStage = () => {
    props.bodySetter.deleteStage(props.stageId);
  };

  const addStage = e => {
    console.log('add stage called');
    props.bodySetter.addStage(props.stageId);
  };

  const addQuestion = e => {
    // const dummy = JSON.parse(JSON.stringify(value));
    // const pos = dummy.findIndex((i) => i.stageId == props.stageId);

    const temp = props.questions.map(x => x.questionId);
    const newId = Math.max(...temp) + 1;

    const newQuestion = {
      stageId: props.stageId,
      questionId: newId,
      title: 'new one',
    };
    props.bodySetter.addQuestion(newQuestion);
  };

  if (props.questions != undefined) {
    return (
      <>
        <div className={classes.root}>
          <div className={classes.container}>
            <Paper className={classes.paperStyle} elevation={10}>
              <p> stage id is {props.stageId}</p>
              {/* <button onClick={addStage}> New stage</button>
            <button onClick={deleteStage}> delete stage</button> */}
              <button onClick={addQuestion}>add question</button>

              {props.questions.map((q, i) => {
                return (
                  <QuestionComponent
                    {...q}
                    submitChecker={props.submitChecker}
                    stageId={props.stageId}
                    questionChange={props.bodySetter.questionChange}
                    key={i}
                  />
                );
              })}
            </Paper>
            <div className={classes.iconContainer}>
              <span>
                {' '}
                <AddToPhotosIcon
                  className={classes.iconStyle}
                  onClick={addStage}
                  fontSize="large"
                />
                <DeleteIcon
                  className={classes.iconStyle}
                  onClick={deleteStage}
                  fontSize="large"
                />
              </span>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div> 'undefined'</div>;
  }
}
