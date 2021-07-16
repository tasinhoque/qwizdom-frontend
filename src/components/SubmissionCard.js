import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 400,
    width: '60%',
    margin: theme.spacing(1, 5, 1, 5),
    padding: theme.spacing(2, 2, 2, 2),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: theme.spacing(1, 1, 1, 1),
      padding: theme.spacing(1, 1, 1, 1),
    },
  },
  avatar: {
    backgroundColor: red[500],
    margin: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
  titleContainer: {
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  hiddenSM: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hiddenMD: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function formatDate(date) {
  var rawDate = new Date(date).getTime();
  var _date = {
    raw: rawDate,
    year: Math.floor(rawDate / (1000 * 60 * 60)),
    days: Math.floor(rawDate / (1000 * 60 * 60 * 24)),
    hours: Math.floor((rawDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((rawDate % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((rawDate % (1000 * 60)) / 1000),
  };
  return _date;
}

export default function SubmissionCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid
        container
        direction="row"
        spacing={0}
        className={classes.titleContainer}
      >
        <Grid container item md={3} sm={2}>
          <div className={classes.user}>
            <Avatar
              className={classes.avatar}
              // src="/assets/images/marcos.png"
              src={props.avatar}
            ></Avatar>
            <Typography variant="body2" color="textPrimary">
              {props.name}
            </Typography>
          </div>
        </Grid>

        <Grid
          container
          item
          md={3}
          className={classes.hiddenSM}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {/* {new Date(props.date).getTime()} */}
            {Moment(props.date).format('DD-MM-YYYY')}
          </Typography>
        </Grid>
        <Grid
          container
          item
          md={3}
          className={classes.hiddenSM}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {props.totalMarks}
          </Typography>
        </Grid>
        <Grid
          container
          item
          md={3}
          className={classes.hiddenSM}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {props.marks}
          </Typography>
        </Grid>

        <Grid
          container
          item
          sm={3}
          className={classes.hiddenMD}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            Date
          </Typography>
        </Grid>
        <Grid
          container
          item
          sm={3}
          className={classes.hiddenMD}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            Marks
          </Typography>
        </Grid>

        <Grid container item md={2} sm={3} style={{ justifyContent: 'center' }}>
          {props.isEvaluated ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#4caf50', color: 'white' }}
            >
              Evaluated
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{ backgroundColor: '#f44336', color: 'white' }}
            >
              Pending
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
