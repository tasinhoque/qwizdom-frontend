import React, { useRef, useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Portal from '@material-ui/core/Portal';

import CheckBoxIcon from '@material-ui/icons/CheckBox';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { findLastIndex } from 'lodash';
import { CenterFocusStrong } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
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
  },
  textFieldStyle: {
    width: '60%',
    margin: '8px',
  },
}));

export default function QuestionComponent(props) {
  const classes = useStyles();
  const [selectType, setType] = useState('');
  const questionBody = useRef({
    stageId: props.stageId,
    questionId: props.questionId,
  });

  console.log(props);

  const [value, setValue] = useState(props.questionLabel || '');
  const updatedVal = useRef('');

  //MCQ Hooks
  const [radio, setRadio] = useState('');
  const [radioArray, setRadioArray] = useState([]);

  const radioVal = useRef([]);
  const addOptionRef = useRef('');
  const placeholderRef = useRef('Add option');
  // const allValueRef = useRef([]);

  const inputChange = e => {
    e.preventDefault();
    updatedVal.current = e.target.value;
    setValue(e.target.value);
    questionBody.current.questionLabel = e.target.value;
    props.questionChange(questionBody.current);
  };
  const handleSelect = e => {
    setType(e.target.value);
    questionBody.current.questionType = e.target.value;
    props.questionChange(questionBody.current);
  };

  const mcqBuilder = () => {
    const handleRadio = e => {
      setRadio(e.target.value);
    };
    const addOption = e => {
      e.preventDefault();
      let opt = addOptionRef.current.value;
      if (opt == '') return;
      if (radioArray.includes(opt)) {
        placeholderRef.current = 'Please add a different option';
      }
      setRadioArray(present => {
        const body = [...radioArray, opt];
        radioVal.current.push(opt);
        // allValueRef.current.push('holder');
        questionBody.current.options = radioVal.current;
        props.questionChange(questionBody.current);
        return body;
      });

      addOptionRef.current.value = '';
    };
    const editOption = (e, index) => {
      // console.log(e.target.value);
      console.log(allValueRef.current[index].value);
      radioVal.current[index] = e.target.value;
      console.log(radioVal.current);
      questionBody.current.options = radioVal.current;
      props.questionChange(questionBody.current);
    };

    const keyPress = e => {
      if (e.keyCode == 13) {
        addOption(e);
      }
    };
    return (
      <div>
        <p> this is MCQ sector </p>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={radio}
          onChange={handleRadio}
        >
          {radioArray.map((r, i) => {
            return (
              <div key={i}>
                <FormControlLabel value={r} control={<Radio />} />

                <TextField
                  onChange={e => {
                    editOption(e, i);
                  }}
                  className={classes.textFieldStyle}
                  defaultValue={r}
                  // inputRef={el => {
                  //   allValueRef.current[i] = el;
                  // }}
                />
              </div>
            );
          })}
          <div style={{ display: 'flex' }}>
            <FormControlLabel value={'s'} control={<Radio />} />

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
  // useEffect(() => {
  //   console.log('submit called');
  //   // const dummy = JSON.parse(JSON.stringify(value));
  //   const dummy = value;
  //   console.log(valueRef.current.value);
  //   dummy[props.stageId - 1].questions[props.questionId - 1].questionName =
  //     valueRef.current.value;
  //   if (submit) {
  //     console.log(props.stageId - 1);
  //     console.log(props.questionId - 1);
  //     localStorage.setItem('dummy', JSON.stringify(dummy));
  //   }
  // }, [submit]);

  // useEffect(() => {
  //   console.log(props);
  //   if (props.submitChecker.current == 'submit') {
  //     console.log('submit checker called');

  //     let message = {
  //       stageId: props.stageId,
  //       questionId: props.questionId,
  //       questionLabel: updatedVal.current,
  //     };
  //     props.questionChange(message);
  //   }
  // }, [props]);
  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <TextField
          style={{ width: '60%', margin: '8px' }}
          variant="filled"
          required
          fullWidth
          // id="email"
          label="Question Text"
          name="email"
          // autoComplete="email"
          // autoFocus
          value={value}
          onChange={inputChange}
        />

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
          <Select
            classes={{
              selectMenu: classes.selectStyle,
            }}
            value={selectType}
            onChange={handleSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Mcq'}>
              {' '}
              <RadioButtonCheckedIcon /> Mcq
            </MenuItem>
            <MenuItem value={'True/False'}>True/false</MenuItem>
            <MenuItem value={'Checkbox'}>
              <CheckBoxIcon /> Checkbox{' '}
            </MenuItem>
          </Select>
        </FormControl>
        {selectType == 'Mcq' && mcqBuilder()}

        {selectType == 'True/False' && (
          <div>
            <p> this is True/False </p>
          </div>
        )}

        {selectType == 'Checkbox' && (
          <div>
            <p> this is Checkbox sector </p>
          </div>
        )}
      </form>
      {/* <p> {props.questionName}</p> */}
      {/* <p> props stage is {props.stageId}</p> */}
    </div>
  );
}
