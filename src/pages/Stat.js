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
import { Header, StatPie } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    paddingLeft: theme.spacing(10),
    paddingLeft: theme.spacing(10),
  },
  container: {
    height: '100px',
    // paddingLeft: theme.spacing(10),
    // paddingLeft: theme.spacing(10),
  },
  questionTitle: {
    marginBottom: theme.spacing(5),
  },
  questionOptions: {},
}));

export default function Stat(props) {
  const classes = useStyles();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

      // let response = await api.getPieInfo('60f54796ae87f5172830e0b0');
      // response.data[0].data.map((e, i) => {
      //   e.color = colors[i % 7];
      // });

      // setData(response.data);
      // console.log(response.data[0].data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container className={classes.container}>
            <Grid
              container
              direction="column"
              item
              md={6}
              className={classes.question}
            >
              <Grid item className={classes.questionTitle}>
                <Typography variant="h3" component="div">
                  Question title
                  {/* {data[0].question.title} */}
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                item
                className={classes.questionOptions}
              >
                {colors.map((e, i) => {
                  return (
                    <Grid container item>
                      <FiberManualRecordIcon style={{ color: e }} />
                      <Typography component="div">Question option</Typography>
                    </Grid>
                  );
                })}
                {/* {data[0].data.map((e, i) => { */}
                {/*   return ( */}
                {/*     <div className={classes.questionOption} key={i}> */}
                {/*       <Typography component="div">{e.title}</Typography> */}
                {/*     </div> */}
                {/*   ); */}
                {/* })} */}
              </Grid>
            </Grid>
            <Grid item md={6} style={{ height: '200px' }}>
              <StatPie />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
}
