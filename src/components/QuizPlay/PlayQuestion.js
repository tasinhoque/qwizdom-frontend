import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Portal from '@material-ui/core/Portal';
import FormGroup from '@material-ui/core/FormGroup';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { findLastIndex } from 'lodash';
import { CenterFocusStrong } from '@material-ui/icons';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import Grid from '@material-ui/core/Grid';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Fab from '@material-ui/core/Fab';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  },
  imageStyle: {
    height: '300px',
    marginRight: theme.spacing(1),
    maxWidth: '80%',
  },
  questionContainer: {
    paddingLeft: theme.spacing(2),
  },
  floatingButton: {
    height: '50px',
    width: '50px',
    minHeight: '20px',
  },
  typoStyle: {
    fontSize: '1.2rem',
    paddingTop: '1.2rem',
    marginBottom: '5px',
    fontWeight: '500',
  },
}));

export default function PlayQuestion(props) {
  const [img, setImg] = useState(null);

  const question = props.question;
  console.log('question is ', question);
  if (question.image instanceof File) {
    console.log('this is file');
    question.image = URL.createObjectURL(question.image);
  }

  const classes = useStyles();
  let dummy = '';
  if (question.type == 'mcq') {
    question.options.map(e => {
      if (e.isAnswer) {
        dummy = e.text;
      }
    });
  }
  const [option, setOption] = useState(dummy);
  const [optionArray, setOptionArray] = useState(question.options);
  // console.log(question);

  const handleOption = (e, i) => {
    if (question.type == 'mcq') {
      question.options.map((e, j) => {
        if (e.text != i) {
          question.options[j].isAnswer = false;
        } else {
          question.options[j].isAnswer = !question.options[j].isAnswer;
        }
      });
      setOption(e.target.value);
    } else {
      question.options[i].isAnswer = !question.options[i].isAnswer;
      setOption(e.target.value + Math.random());
    }
    console.log(question.options);
    props.allFunctions.questionChange(props.qId, question);
  };

  const mcqBuilder = () => {
    return (
      <div>
        <Typography className={classes.typoStyle}> {question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={question.image} />
          </div>
        )}
        <div className={classes.optionContainer} style={{ paddingLeft: '10%' }}>
          <RadioGroup value={option} onChange={handleOption}>
            {optionArray.map((r, i) => {
              return (
                <div key={i}>
                  <FormControlLabel
                    value={r.text}
                    label={r.text}
                    control={<Radio />}
                  />
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
        <FormGroup value={option}>
          {optionArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel
                  value={r.text}
                  label={r.text}
                  control={
                    <Checkbox
                      checked={r.isAnswer}
                      onChange={e => {
                        handleOption(e, i);
                      }}
                    />
                  }
                />
              </div>
            );
          })}
        </FormGroup>
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

        <FormGroup>
          {optionArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel
                  label={r.text}
                  control={
                    <Switch
                      checked={r.isAnswer}
                      onChange={e => {
                        handleOption(e, i);
                      }}
                    />
                  }
                />
              </div>
            );
          })}
        </FormGroup>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.questionStyle} elevation={7}>
        <form>
          <div className={classes.questionContainer}>
            {question.type == 'mcq' && mcqBuilder()}
            {question.type == 'trueOrFalse' && tfBuilder()}
            {question.type == 'checkbox' && checkboxBuilder()}
          </div>
        </form>

        {/* <p> {props.questionName}</p> */}
        {/* <p> props stage is {props.stageId}</p> */}
      </Paper>
    </div>
  );
}
