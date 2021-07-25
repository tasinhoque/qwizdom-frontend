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
import submissionDialog from '../SubmissionDialog';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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
    minHeight: 220,
    marginRight: theme.spacing(1),
    maxWidth: '50%',
  },
  floatingButton: {
    height: '50px',
    width: '50px',
    minHeight: '20px',
  },
  paperItemStyle: {
    padding: theme.spacing(4, 4, 3, 4),
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
  optionContainer: {
    padding: theme.spacing(0, 2, 0, 0),
  },
}));

export default function PlayQuestion(props) {
  let im = '';
  const question = props.question;
  const previewState = props.previewState;
  console.log('question is ', question);
  if (question.image instanceof File) {
    // console.log('this is file');
    im = URL.createObjectURL(question.image);
    // console.log(im);
  } else if (question.image) {
    im = question.image;
  }

  const [img, setImg] = useState(im);

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
  const textHandler = e => {
    question.text = e.target.value;
    props.allFunctions.questionChange(props.qId, question);
  };
  const [editorState, setEditorState] = useState('');
  useEffect(() => {
    // const contentRaw = convertToRaw(editorState.getCurrentContent());

    const p = JSON.stringify(editorState);
    // console.log(contentRaw);
  }, [editorState]);

  // console.log(question);

  const handleOption = (e, i) => {
    if (props.previewState) {
      return;
    }
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
        <Typography className={classes.typoStyle}>{question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={img} />
          </div>
        )}
        <div className={classes.optionContainer}>
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
            <img className={classes.imageStyle} src={img} />
          </div>
        )}
        <div className={classes.optionContainer}>
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
      </div>
    );
  };
  const tfBuilder = () => {
    return (
      <div>
        <Typography className={classes.typoStyle}>{question.title}</Typography>
        {question.image && (
          <div className={classes.imageContainer}>
            <img className={classes.imageStyle} src={img} />
          </div>
        )}
        <div className={classes.optionContainer}>
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
      </div>
    );
  };
  const paragraphBuilder = () => {
    return (
      <>
        <Typography className={classes.typoStyle}>{question.title}</Typography>
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
            resize: 'vertical',
            width: '100%',
            minHeight: '150px',
            padding: '10px',
            marginTop: '10px',
            border: '2px solid black',
          }}
          defaultValue={question.text}
          disabled={previewState}
          aria-label="minimum height"
          onChange={textHandler}
        />
      </>
    );
  };
  return (
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
            {props.quizInfo.isTest && (
              <Typography
                style={{
                  fontWeight: '420',
                  fontSize: '1.2rem',
                }}
              >
                {question.points} points
              </Typography>
            )}
          </div>
          <div style={{ padding: '20px 0px 0px 20px' }}>
            <form>
              <div>
                {question.type == 'mcq' && mcqBuilder()}
                {question.type == 'trueOrFalse' && tfBuilder()}
                {question.type == 'checkbox' && checkboxBuilder()}
                {question.type == 'text' && paragraphBuilder()}
              </div>
            </form>
          </div>

          {/* <p> {props.questionName}</p> */}
          {/* <p> props stage is {props.stageId}</p> */}
        </div>
      </Paper>
    </div>
  );
}
