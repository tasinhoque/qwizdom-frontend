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

export default function SubmissionCard() {
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
              src="/assets/images/marcos.png"
              className={classes.avatar}
            ></Avatar>
            <Typography variant="body2" color="textPrimary">
              Marcos
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
            Submission Date
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
            Total Marks
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
            Obtained Marks
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
          <Button>Pending</Button>
        </Grid>
      </Grid>
    </Card>
  );
}
