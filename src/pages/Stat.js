import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ComponentProps,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, StatPie, QuizHeader } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
  },
  container: {
    paddingTop: theme.spacing(5),
    // paddingBottom: theme.spacing(10),
  },
  questionTitle: {
    marginBottom: theme.spacing(5),
  },
  questionOptions: {},
  question: {
    justifyContent: 'center',
  },
  quizheader: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  paper: {
    minWidth: '80%',
    margin: theme.spacing(3, 0, 6, 0),
  },
  coverImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  box: {
    // marginTop: '-20px',
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

export default function Stat(props) {
  const classes = useStyles();
  const { id } = useParams();
  // const id = '60f6c14572c5f877f8f9c83a';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [quiz, setQuiz] = useState({});

  const colors = [
    '#b58900',
    '#cb4b16',
    '#d33682',
    '#6c71c4',
    '#268bd2',
    '#2aa198',
    '#859900',
  ];

  useEffect(async () => {
    try {
      setLoading(true);

      let response = await api.getPieInfo(id);
      response.data.map((elem, idx) => {
        elem.data.map((e, i) => {
          e.color = colors[i % 7];
        });
      });

      setData(response.data);
      console.log(response.data);

      let res = await api.getQuiz(id);
      setQuiz(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '100px',
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={classes.root}>
          <QuizHeader quiz={quiz} />
          <Grid container>
            {data.map((elem, idx) => {
              return (
                <Grid container item className={classes.container} key={idx}>
                  <Grid
                    container
                    direction="column"
                    item
                    md={8}
                    className={classes.question}
                  >
                    <Grid item className={classes.questionTitle}>
                      <Typography variant="h5" component="div">
                        {elem.question.serial + 1}. {elem.question.title}
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      direction="column"
                      item
                      className={classes.questionOptions}
                    >
                      {elem.data.map((e, i) => {
                        return (
                          <Grid container item key={i}>
                            <FiberManualRecordIcon
                              style={{ color: colors[i] }}
                            />
                            <Typography variant="body1">{e.title}</Typography>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    md={4}
                    style={{ height: '250px', paddingTop: '20px' }}
                  >
                    <StatPie data={elem.data} />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </>
  );
}
