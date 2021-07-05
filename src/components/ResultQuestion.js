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
  optionStyle: {
    display: 'flex',
    alignItems: 'center',
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
        <div className={classes.optionContainer} style={{ paddingLeft: '10%' }}>
          <RadioGroup value={option}>
            {optionArray.map((r, i) => {
              return (
                <div className={classes.optionStyle} key={i}>
                  <FormControlLabel
                    value={r.text}
                    label={r.text}
                    control={<Radio />}
                  />
                  {r.isAnswer == true && (
                    <CheckIcon style={{ color: 'green' }} />
                  )}
                  {element.options[i] == true && r.isAnswer == false && (
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
        <FormGroup>
          {optionArray.map((r, i) => {
            return (
              <div key={i} className={classes.optionStyle}>
                <FormControlLabel
                  value={r.text}
                  label={r.text}
                  control={<Checkbox checked={element.options[i]} />}
                />
                {r.isAnswer && <CheckIcon style={{ color: 'green' }} />}
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
              <div key={i} className={classes.optionStyle}>
                <FormControlLabel
                  label={r.text}
                  control={<Switch checked={element.options[i]} />}
                />
                {r.isAnswer == element.options[i] ? (
                  <CheckIcon style={{ color: 'green' }} />
                ) : (
                  <CloseIcon style={{ color: 'red' }} />
                )}
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
      </Paper>
    </div>
  );
}
