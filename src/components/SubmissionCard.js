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
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import IconButton from '@material-ui/core/IconButton';
import { useParams, useHistory } from 'react-router';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withRouter } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 400,
    width: theme.spacing(100),
    margin: theme.spacing(1, 5, 1, 5),
    padding: theme.spacing(2, 2, 2, 2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(1, 1, 1, 1),
      padding: theme.spacing(1, 1, 1, 1),
    },
  },
  avatar: {
    backgroundColor: red[500],
    margin: theme.spacing(0, 2, 0, 0),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, 0, 0, 0),
    },
  },
  titleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
  participant: {},
  hiddenXS: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hiddenMD: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default withRouter(function SubmissionCard(props) {
  const classes = useStyles();

  const { id } = useParams();

  const handlePending = () => {
    props.history.push(`/quiz/${props.quizid}/evaluate/${props.userid}`);
  };

  const handleDone = () => {
    props.history.push(`/quiz/${props.quizid}/submission/${props.userid}`);
  };

  return (
    <Card className={classes.root}>
      <Grid container spacing={0} className={classes.titleContainer}>
        <Grid container item md={3} xs={3} className={classes.user}>
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

        <Grid container item md={3} xs={4} style={{ justifyContent: 'center' }}>
          <Typography variant="body2" color="textPrimary">
            {Moment(props.date).format('DD-MM-YYYY')}
          </Typography>
        </Grid>

        <Grid
          container
          item
          md={2}
          className={classes.hiddenXS}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {props.totalMarks}
          </Typography>
        </Grid>
        <Grid
          container
          item
          md={2}
          className={classes.hiddenXS}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {props.marks}
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={3}
          className={classes.hiddenMD}
          style={{ justifyContent: 'center' }}
        >
          <Typography variant="body2" color="textPrimary">
            {props.marks}/{props.totalMarks}
          </Typography>
        </Grid>

        <Grid
          container
          item
          md={2}
          style={{ justifyContent: 'center' }}
          className={classes.hiddenXS}
        >
          {props.isEvaluated ? (
            <Tooltip placement="right" title="Go to submission page">
              <Button
                type="submit"
                variant="contained"
                size="small"
                style={{ backgroundColor: '#4caf50', color: 'white' }}
                onClick={handleDone}
              >
                Evaluated
              </Button>
            </Tooltip>
          ) : (
            <Tooltip placement="right" title="Go to evaluation page">
              <Button
                type="submit"
                variant="contained"
                size="small"
                style={{ backgroundColor: '#f44336', color: 'white' }}
                onClick={handlePending}
              >
                Pending
              </Button>
            </Tooltip>
          )}
        </Grid>

        <Grid
          container
          item
          xs={2}
          style={{ justifyContent: 'center' }}
          className={classes.hiddenMD}
        >
          {props.isEvaluated ? (
            <Tooltip placement="right" title="Go to submission page">
              <IconButton size="small" style={{ color: '#4caf50' }}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip placement="right" title="Go to evaluation page">
              <IconButton
                size="small"
                style={{ color: '#f44336' }}
                onClick={handlePending}
              >
                <FormatListBulletedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Grid>
    </Card>
  );
});
