import { useState, useRef, useEffect } from 'react';
import 'date-fns';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Fab,
  Chip,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import api from '../api';
import { Header } from '../components';

const useStyles = makeStyles(theme => ({
  root: {},
  main: {
    margin: theme.spacing(6, 0, 0, 0),
    justifyContent: 'center',
  },
  rightColumn: {
    margin: theme.spacing(6, 0, 0, 0),
  },
  addCover: {
    marginTop: theme.spacing(5),
  },
  cover: {
    height: theme.spacing(30),
    marginTop: theme.spacing(2),
  },
  textField: {
    minWidth: '300px',
  },
  input: {
    display: 'none',
  },
  editAvatar: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
  imageContainer: {
    position: 'relative',
    margin: theme.spacing(5, 1, 5, 1),
    left: '0',
    bottom: '0',
  },
  category: {
    marginBottom: theme.spacing(4),
    minWidth: '300px',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const QuizCreationBasic = () => {
  const classes = useStyles();
  const [isTest, setTest] = useState(true);
  const [hasAutoEvaluation, setAutoEvaluation] = useState(true);
  const [name, setName] = useState('');
  const cover = useRef(null);
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [img, setImg] = useState(null);
  const [startDate, setStartDate] = useState(new Date('2021-1-1'));
  const [endDate, setEndDate] = useState(new Date('2021-1-1'));
  const history = useHistory();
  const [names, setNames] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const theme = useTheme();

  const handleChange = event => {
    const arr = event.target.value;
    setPersonName(arr);

    const ids = [];
    names.forEach(({ name, id }) => {
      if (arr.includes(name)) {
        ids.push(id);
      }
    });

    setCategoryIds(ids);
  };

  useEffect(async () => {
    const response = await api.getCategories();
    setNames(response.data);
  }, []);

  const handleTypeChange = ({ target: { value } }) => {
    setTest(value === 'test');
  };

  const handleEvaluationChange = ({ target: { value } }) => {
    setAutoEvaluation(value === 'auto');
  };

  const handleImage = e => {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      setImg(URL.createObjectURL(file));
      cover.current = file;
    }
  };

  const handleStartDate = date => {
    setStartDate(date);
    console.log(date);
  };

  const handleEndDate = date => {
    setEndDate(date);
    console.log(date);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        isTest,
        hasAutoEvaluation,
        name,
        description,
        duration,
        categories: categoryIds,
        startTime:
          startDate.getTime() === new Date('2021-1-1').getTime()
            ? undefined
            : startDate,
        endTime:
          startDate.getTime() === new Date('2021-1-1').getTime()
            ? undefined
            : endDate,
      };

      const { data: quiz } = await api.postQuiz(requestBody);

      if (img != null) {
        let formData = new FormData();
        formData.append('cover', cover.current);
        formData.append('fileUpload', true);

        try {
          await api.updateCover(quiz.id, formData);
        } catch (error) {
          console.log(error.response.data.message);
        }
      }

      history.push(`/creation/${quiz.id}`);
    } catch (error) {
      console.log('App crashed, error:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Header style={{ width: '100%' }} />
      <Container>
        <Grid container className={classes.main}>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              spacing={3}
              style={{ justifyContent: 'center' }}
            >
              <Grid item>
                <Typography variant="h4">Quiz Settings</Typography>
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    value={isTest ? 'test' : 'survey'}
                    onChange={handleTypeChange}
                  >
                    <FormControlLabel
                      value="test"
                      control={<Radio />}
                      label="Test"
                    />
                    <FormControlLabel
                      value="survey"
                      control={<Radio />}
                      label="Survey"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className={classes.textField}
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  label="Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  multiline
                  rows={5}
                  className={classes.textField}
                />
              </Grid>
              {isTest ? (
                <Grid item>
                  <TextField
                    variant="outlined"
                    label="Duration (in min)"
                    value={duration}
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={e => setDuration(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
              ) : (
                <div></div>
              )}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Proceed
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            item
            xs={6}
            className={classes.rightColumn}
          >
            <Grid item className={classes.category}>
              <FormControl className={classes.formControl} variant="filled">
                <Typography variant="h6" gutterBottom>
                  Categories
                </Typography>
                <Select
                  labelId="demo-mutiple-chip-filled-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.muiChip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(({ name, id }) => (
                    <MenuItem
                      key={id}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              {isTest ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">Evaluation</FormLabel>
                  <RadioGroup
                    value={hasAutoEvaluation ? 'auto' : 'manual'}
                    onChange={handleEvaluationChange}
                  >
                    <FormControlLabel
                      value="auto"
                      control={<Radio />}
                      label="Auto"
                    />
                    <FormControlLabel
                      value="manual"
                      control={<Radio />}
                      label="Manual"
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <div></div>
              )}
            </Grid>
            <Grid item>
              {isTest ? (
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around" direction="column">
                      <Grid item>
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-start"
                          label="Start Date"
                          format="MM/dd/yyyy"
                          value={startDate}
                          onChange={handleStartDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <KeyboardTimePicker
                          margin="normal"
                          id="time-picker-start"
                          label="Start Time"
                          value={startDate}
                          onChange={handleStartDate}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
                  {/*   <Grid container justify="space-around" direction="column"> */}
                  {/*     <Grid item> */}
                  {/*       <KeyboardDatePicker */}
                  {/*         margin="normal" */}
                  {/*         id="date-picker-end" */}
                  {/*         label="End Date" */}
                  {/*         format="MM/dd/yyyy" */}
                  {/*         value={endDate} */}
                  {/*         onChange={handleEndDate} */}
                  {/*         KeyboardButtonProps={{ */}
                  {/*           'aria-label': 'change date', */}
                  {/*         }} */}
                  {/*       /> */}
                  {/*     </Grid> */}
                  {/*     <Grid item> */}
                  {/*       <KeyboardTimePicker */}
                  {/*         margin="normal" */}
                  {/*         id="time-picker-end" */}
                  {/*         label="End Time" */}
                  {/*         value={endDate} */}
                  {/*         onChange={handleEndDate} */}
                  {/*         KeyboardButtonProps={{ */}
                  {/*           'aria-label': 'change time', */}
                  {/*         }} */}
                  {/*       /> */}
                  {/*     </Grid> */}
                  {/*   </Grid> */}
                  {/* </MuiPickersUtilsProvider> */}
                </Grid>
              ) : (
                <div></div>
              )}
              <Grid item className={classes.imageContainer}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="coverPhoto"
                  multiple
                  type="file"
                  onChange={handleImage}
                  // disabled={formDisabled}
                />
                <Grid container direction="row" className={classes.addCover}>
                  <Typography style={{ marginRight: '30px' }}>
                    Upload cover photo
                  </Typography>
                  <label htmlFor="coverPhoto">
                    <Fab component="span">
                      <AddPhotoAlternateIcon />
                    </Fab>
                  </label>
                </Grid>
                {img && <img src={img} className={classes.cover} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default QuizCreationBasic;
