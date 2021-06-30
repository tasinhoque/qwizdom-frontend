import { useState } from 'react';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6, 0, 0, 0),
  },
  rightColumn: {
    margin: theme.spacing(6, 0, 0, 0),
  },
}));

const QuizCreationBasic = () => {
  const classes = useStyles();
  const [isTest, setTest] = useState(true);
  const [hasAutoEvaluation, setAutoEvaluation] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const history = useHistory();

  const handleTypeChange = ({ target: { value } }) => {
    setTest(value === 'test');
  };

  const handleEvaluationChange = ({ target: { value } }) => {
    setAutoEvaluation(value === 'auto');
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        isTest,
        hasAutoEvaluation,
        name,
        description,
        duration,
      };

      const quiz = await api.postQuiz(requestBody);
      history.push(`/creation/${quiz.data.id}`);
      console.log(quiz.data);
    } catch (error) {
      console.log('App crashed, error:', error);
    }
  };

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={6}>
          <Grid container direction="column" spacing={3}>
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
                label="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={5}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="duration (in min)"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </Grid>
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
        <Grid item xs={6} className={classes.rightColumn}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Evaluation</FormLabel>
            <RadioGroup
              value={hasAutoEvaluation ? 'auto' : 'manual'}
              onChange={handleEvaluationChange}
            >
              <FormControlLabel value="auto" control={<Radio />} label="Auto" />
              <FormControlLabel
                value="manual"
                control={<Radio />}
                label="Manual"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuizCreationBasic;
