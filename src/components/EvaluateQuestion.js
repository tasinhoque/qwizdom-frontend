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
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

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
    marginBottom: '35px',
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
  pointStyle: {
    width: '100%',
  },
}));
export default function EvaluateQuestion(props) {
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

  // console.log(props);
  const classes = useStyles();
  const onPointChange = e => {
    element.points = e.target.value;
    props.allFunctions.questionChange(props.qId, element.points);
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
          disabled
        />
      </>
    );
  };
  return (
    question.type == 'text' && (
      <div className={classes.container}>
        <Paper className={classes.questionStyle} elevation={7}>
          <div className={classes.paperItemStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                style={{
                  fontWeight: '400',
                  fontSize: '1.4rem',
                }}
              >
                Question {question.serial + 1}
              </Typography>
              <Typography style={{ fontWeight: '400', fontSize: '1.2rem' }}>
                {question.points} points
              </Typography>
            </div>
            <div style={{ padding: '20px 0px 0px 20px' }}>
              <form>{paragraphBuilder()}</form>

              <Grid
                container
                style={{ marginTop: '3px' }}
                spacing={3}
                alignItems="center"
              >
                <Grid item>
                  <Typography style={{ fontWeight: '400', fontSize: '1.2rem' }}>
                    Score{' '}
                  </Typography>
                </Grid>
                <Grid item style={{ flexGrow: '1' }}>
                  <TextField
                    className={classes.pointStyle}
                    onChange={onPointChange}
                    id="outlined-number"
                    type="number"
                    size="medium"
                    defaultValue={element.points}
                    variant="outlined"
                    InputProps={{
                      inputProps: { min: 0, max: question.points },
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </Paper>
      </div>
    )
  );
}
