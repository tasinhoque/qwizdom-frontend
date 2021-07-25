import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as ReactLogo } from './../assets/check.svg';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles(theme => ({
  root: {},
  question: {
    minWidth: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  textFieldStyle: {
    margin: '8px',
  },
  questionStyle: {
    margin: theme.spacing(2),
    minHeight: theme.spacing(25),
    position: 'relative',
    width: '70%',
    borderRadius: '8px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  },
  imageStyle: {
    height: 'auto',
    margin: theme.spacing(1),
    maxWidth: '50%',
  },
  questionContainer: {
    paddingLeft: theme.spacing(3),
  },
  optionStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  floatingButton: {
    height: '50px',
    width: '50px',
    minHeight: '20px',
  },
  paperItemStyle: {
    padding: theme.spacing(4, 4, 3, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2, 2, 2),
    },
  },
  optionContainer: {
    padding: theme.spacing(0, 2, 0, 0),
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    fontWeight: '400',
  },
}));
export default function PlayQuestion(props) {
  const element = props.element;
  const question = props.element.question;
  let dummy = '';
  if (question.type == 'mcq') {
    element.options.map((e, i) => {
      if (e) {
        dummy = question.options[i].text;
      }
    });
  }
  const [option, setOption] = useState(dummy);
  const [optionArray, setOptionArray] = useState(question.options);

  console.log(props);
  const classes = useStyles();
  const mcqBuilder = () => {
    return (
      <div>
        <Typography className={classes.typoStyle}> {question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={question.image} />
          </div>
        )}
        <div className={classes.optionContainer}>
          <RadioGroup value={option}>
            {optionArray.map((r, i) => {
              return (
                <div className={classes.optionStyle} key={i}>
                  <FormControlLabel
                    value={r.text}
                    label={r.text}
                    control={<Radio />}
                  />
                  {props.fullQuiz.quiz.isTest && r.isAnswer == true && (
                    <CheckIcon style={{ color: 'green' }} />
                  )}
                  {props.fullQuiz.quiz.isTest &&
                    element.options[i] == true &&
                    r.isAnswer == false && (
                      <CloseIcon style={{ color: 'red' }} />
                    )}
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </div>
    );
  };

  const checkboxBuilder = () => {
    return (
      <div>
        <Typography className={classes.typoStyle}> {question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={question.image} />
          </div>
        )}
        <div className={classes.optionContainer}>
          <FormGroup>
            {optionArray.map((r, i) => {
              return (
                <div key={i} className={classes.optionStyle}>
                  <FormControlLabel
                    value={r.text}
                    label={r.text}
                    control={<Checkbox checked={element.options[i]} />}
                  />
                  {props.fullQuiz.quiz.isTest && r.isAnswer && (
                    <CheckIcon style={{ color: 'green' }} />
                  )}
                </div>
              );
            })}
          </FormGroup>
        </div>
      </div>
    );
  };
  const tfBuilder = () => {
    return (
      <div>
        <Typography className={classes.typoStyle}>{question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={question.image} />
          </div>
        )}
        <div className={classes.optionContainer}>
          <FormGroup>
            {optionArray.map((r, i) => {
              return (
                <div key={i} className={classes.optionStyle}>
                  <FormControlLabel
                    label={r.text}
                    control={<Switch checked={element.options[i]} />}
                  />
                  {props.fullQuiz.quiz.isTest &&
                    (r.isAnswer == element.options[i] ? (
                      <CheckIcon style={{ color: 'green' }} />
                    ) : (
                      <CloseIcon style={{ color: 'red' }} />
                    ))}
                </div>
              );
            })}
          </FormGroup>
        </div>
      </div>
    );
  };
  const paragraphBuilder = () => {
    return (
      <>
        <Typography className={classes.typoStyle}>{question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={question.image} />
          </div>
        )}
        {/* <div
          style={{
            border: '1px solid black',
            padding: '2px',
            minHeight: '400px',
          }}
        >
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </div> */}
        <TextareaAutosize
          style={{
            cursor: 'default',
            marginTop: '8px',
            resize: 'none',
            width: '100%',
            minHeight: '150px',
            padding: '10px',
            border: '2px solid black',
          }}
          aria-label="minimum height"
          value={element.text}
          readOnly
        />
      </>
    );
  };
  return (
    <div className={classes.container}>
      <Paper className={classes.questionStyle} elevation={7}>
        <div className={classes.paperItemStyle}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              style={{
                fontWeight: '400',
                fontSize: '1.4rem',
              }}
            >
              {/* Question {element.question.serial + 1} */}
              Question {props.qId + 1}
            </Typography>
            {props.fullQuiz.quiz.isTest && (
              <Typography
                align="right"
                style={{ fontWeight: '400', fontSize: '1.2rem' }}
              >
                {' '}
                {question.type == 'text' && props.fullQuiz.isEvaluated == false
                  ? 'Pending'
                  : `${element.points}/${question.points} points`}
                {/* {element.points}/{question.points} points */}
              </Typography>
            )}
          </div>
          <div style={{ padding: '20px 0px 0px 20px' }}>
            <form>
              {question.type == 'mcq' && mcqBuilder()}
              {question.type == 'trueOrFalse' && tfBuilder()}
              {question.type == 'checkbox' && checkboxBuilder()}
              {question.type == 'text' && paragraphBuilder()}
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
}
