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
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  selectStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'space-between',
  },
  textFieldStyle: {
    margin: '8px',
  },
  questionStyle: {
    margin: theme.spacing(2),
    minHeight: theme.spacing(25),
    position: 'relative',
  },
  container: {
    marginBottom: '50px',
  },
  iconStyle: {
    cursor: 'pointer',
  },
  input: {
    display: 'none',
  },

  iconContainer: {
    position: 'absolute',
    top: '-30px',
    right: '-10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    display: 'flex',
    alignContent: 'flex-start',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  imageStyle: {
    height: '200px',
    width: '100%',
    marginRight: theme.spacing(1),
  },
  questionContainer: {
    paddingLeft: theme.spacing(2),
  },
  floatingButton: {
    height: '50px',
    width: '50px',
    minHeight: '20px',
  },
}));

export default function QuestionComponent(props) {
  let qHold = props.element;
  let full = props.fullQues[props.stageId].questions[props.questionId];
  console.log(full);
  const classes = useStyles();
  const [selectType, setType] = useState(full.type ? full.type : '');
  const questionBody = useRef({
    stageId: props.stageId,
    questionId: props.questionId,
    title: full.title,
    points: 10,
    options: full.options,
  });

  const [value, setValue] = useState(props.title || '');
  const updatedVal = useRef('');

  //MCQ Hooks
  const [option, setOption] = useState('');
  const [optionArray, setOptionArray] = useState(
    full.options ? full.options : []
  );
  const optionHolder = useRef([]);
  const addOptionRef = useRef('');
  const placeholderRef = useRef('Add option');

  //image upload Hooks
  const [img, setImg] = useState(null);
  const imageInputId = 'sid-' + props.stageId + 'qid-' + props.questionId;

  //jodit hook
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  // const allValueRef = useRef([]);

  const addQuestion = () => {
    props.bodySetter.addQuestion(props.stageId, props.questionId);
  };

  const deleteQuestion = i => {
    props.bodySetter.deleteQuestion(props.stageId, props.questionId);
  };

  const inputChange = e => {
    e.preventDefault();
    updatedVal.current = e.target.value;
    setValue(e.target.value);
    questionBody.current.title = e.target.value;
    props.questionChange(questionBody.current);
  };
  const editTitle = e => {
    questionBody.current.title = e.target.value;
    props.questionChange(questionBody.current);
  };
  const handleSelect = e => {
    setType(e.target.value);

    if (
      questionBody.current.type &&
      questionBody.current.type != e.target.value
    ) {
      setOptionArray([]);
      optionHolder.current = [];
    }
    questionBody.current.type = e.target.value;
    props.questionChange(questionBody.current);
  };
  const handleOption = (e, i) => {
    if (selectType != 'mcq') {
      questionBody.current.options[i].isAnswer =
        !questionBody.current.options[i].isAnswer;
      setOption(e.target.value + Math.random());
    } else {
      questionBody.current.options.map((element, i) => {
        if (element.text == e.target.value) {
          questionBody.current.options[i].isAnswer = true;
        } else {
          questionBody.current.options[i].isAnswer = false;
        }
        setOption(e.target.value);
      });
    }
  };
  const handleImage = e => {
    console.log(e);
    if (e.target.files.length !== 0) {
      setImg(URL.createObjectURL(e.target.files[0]));
      console.log('image added', e.target.files[0]);
      questionBody.current.image = e.target.files[0];
      props.questionChange(questionBody.current);
    }
  };
  const imageDelete = e => {
    setImg(null);
    delete questionBody.current.image;
    props.questionChange(questionBody.current);
  };

  const addOption = e => {
    e.preventDefault();
    let opt = {
      text: addOptionRef.current.value,
      isAnswer: false,
    };
    if (opt.text == '') return;
    // if (optionArray.includes(opt)) {
    //   placeholderRef.current = 'Please add a different option';
    // }
    setOptionArray(present => {
      const body = [...optionArray, opt];
      optionHolder.current.push(opt);
      // allValueRef.current.push('holder');
      questionBody.current.options = optionHolder.current;
      props.questionChange(questionBody.current);
      return body;
    });

    addOptionRef.current.value = '';
  };
  const removeOption = e => {
    // console.log(optionArray.indexOf(e));
    setOptionArray(present => {
      const body = [...optionArray];
      optionHolder.current.splice(e, 1);
      body.splice(e, 1);
      questionBody.current.options = optionHolder.current;
      props.questionChange(questionBody.current);
      return body;
    });
  };
  const editOption = (e, index) => {
    // console.log(e.target.value);
    optionHolder.current[index].text = e.target.value;
    console.log(optionHolder.current);
    questionBody.current.options = optionHolder.current;
    props.questionChange(questionBody.current);
  };
  const keyPress = e => {
    if (e.keyCode == 13) {
      addOption(e);
    }
  };

  const mcqBuilder = () => {
    // const handleOption = e => {
    //   setOption(e.target.value);
    // };
    return (
      <div>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={option}
          onChange={handleOption}
        >
          {optionArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel value={r.text} control={<Radio />} />

                <TextField
                  onChange={e => {
                    editOption(e, i);
                  }}
                  className={classes.textFieldStyle}
                  defaultValue={r.text}
                  // inputRef={el => {
                  //   allValueRef.current[i] = el;
                  // }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            );
          })}
          <div style={{ display: 'flex' }}>
            <FormControlLabel value={'s'} disabled control={<Radio />} />

            <TextField
              style={{ width: '60%', margin: '8px' }}
              variant="filled"
              required
              onKeyDown={keyPress}
              placeholder={placeholderRef.current}
              inputRef={addOptionRef}
              onBlur={addOption}
            />
          </div>
        </RadioGroup>
      </div>
    );
  };

  const checkboxBuilder = () => {
    return (
      <div>
        <FormGroup value={option}>
          {optionArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel
                  value={r.text}
                  control={
                    <Checkbox
                      checked={r.isAnswer}
                      onChange={e => {
                        handleOption(e, i);
                      }}
                    />
                  }
                />
                <TextField
                  onChange={e => {
                    editOption(e, i);
                  }}
                  className={classes.textFieldStyle}
                  defaultValue={r.text}
                  // inputRef={el => {
                  //   allValueRef.current[i] = el;
                  // }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            );
          })}
        </FormGroup>
        <div style={{ display: 'flex' }}>
          <FormControlLabel value={'s'} disabled control={<Checkbox />} />

          <TextField
            style={{ width: '60%', margin: '8px' }}
            variant="filled"
            required
            onKeyDown={keyPress}
            placeholder={placeholderRef.current}
            inputRef={addOptionRef}
            onBlur={addOption}
          />
        </div>
        {/* <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}> */}
      </div>
    );
  };

  const tfBuilder = () => {
    return (
      <div>
        <FormGroup>
          {optionArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel
                  value={r.text}
                  control={
                    <Switch
                      checked={r.isAnswer}
                      onChange={e => {
                        handleOption(e, i);
                      }}
                    />
                  }
                />
                <TextField
                  onChange={e => {
                    editOption(e, i);
                  }}
                  className={classes.textFieldStyle}
                  defaultValue={r.text}
                  // inputRef={el => {
                  //   allValueRef.current[i] = el;
                  // }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    removeOption(i);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            );
          })}
        </FormGroup>
        <div style={{ display: 'flex' }}>
          <FormControlLabel value={'s'} disabled control={<Switch />} />

          <TextField
            style={{ width: '60%', margin: '8px' }}
            variant="filled"
            required
            onKeyDown={keyPress}
            placeholder={placeholderRef.current}
            inputRef={addOptionRef}
            onBlur={addOption}
          />
        </div>
        {/* <IconButton aria-label="delete" onClick={()=>{removeOption(i, j)}}> */}
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.questionStyle} elevation={7}>
        <div className={classes.iconContainer}>
          <span>
            {' '}
            <AddCircleOutlineTwoToneIcon
              className={classes.iconStyle}
              onClick={addQuestion}
              fontSize="large"
              style={{ color: 'gray' }}
            />
            <DeleteOutlineTwoToneIcon
              className={classes.iconStyle}
              onClick={deleteQuestion}
              fontSize="large"
              style={{ color: 'gray' }}
            />
          </span>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={8}>
              {/* <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}}
              /> */}
              <TextField
                className={classes.textFieldStyle}
                variant="filled"
                required
                fullWidth
                multiline
                // id="email"
                label="Question Text"
                name="email"
                // autoComplete="email"
                autoFocus
                // value={value}
                // onChange={inputChange}
                defaultValue={full.title || ''}
                onChange={editTitle}
              />
            </Grid>
            <Grid item sm={3}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Type
                </InputLabel>
                <Select
                  classes={{
                    selectMenu: classes.selectStyle,
                  }}
                  placeholder="Type"
                  value={selectType}
                  onChange={handleSelect}
                >
                  <MenuItem value={'mcq'}>
                    {' '}
                    <RadioButtonCheckedIcon
                      style={{ fontSize: '1.7rem' }}
                    />{' '}
                    Mcq
                  </MenuItem>
                  <MenuItem value={'trueOrFalse'}>
                    {' '}
                    <ToggleOffIcon style={{ fontSize: '1.7rem' }} /> True/false
                  </MenuItem>
                  <MenuItem value={'checkbox'}>
                    <CheckBoxIcon style={{ fontSize: '1.7rem' }} /> Checkbox{' '}
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div className={classes.imageContainer}>
            <input
              accept="image/*"
              className={classes.input}
              id={imageInputId}
              multiple
              type="file"
              onChange={handleImage}
            />
            {!img && (
              <div>
                <label htmlFor={imageInputId}>
                  <Fab
                    component="span"
                    classes={{ root: classes.floatingButton }}
                  >
                    <AddPhotoAlternateIcon />
                  </Fab>
                </label>
              </div>
            )}

            {img && (
              <>
                <div>
                  <Fab
                    component="span"
                    classes={{ root: classes.floatingButton }}
                    onClick={imageDelete}
                  >
                    <CloseIcon fontSize="large" />
                  </Fab>
                </div>
                <span>
                  <img className={classes.imageStyle} src={img} />
                </span>
              </>
            )}
          </div>
          <div className={classes.questionContainer}>
            {selectType == 'mcq' && mcqBuilder()}

            {selectType == 'trueOrFalse' && tfBuilder()}

            {selectType == 'checkbox' && checkboxBuilder()}
          </div>
        </form>

        {/* <p> {props.questionName}</p> */}
        {/* <p> props stage is {props.stageId}</p> */}
      </Paper>
    </div>
  );
}
