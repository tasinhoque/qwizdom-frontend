import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
  rootDivider: {
    height: '2px',
    // backgroundColor: 'black'
  },
  paperStyle: {
    minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
  },
  dummyContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: '5px',
    },
  },
  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
}));

export default function ThreadCard(props) {
  const classes = useStyles();

  const thread = props.thread;
  console.log(props);

  return (
    <Paper className={classes.paperStyle} variant="outlined" square>
      <Grid container style={{ borderRadius: '6px' }}>
        {/* <Paper style={{ flexGrow: 1, padding: '15px' }}> */}
        <div className={classes.dummyContainer}>
          <Avatar alt={thread.user.name} src={thread.user.avatar} />
          <div
            style={{
              alignSelf: 'center',
              fontWeight: '500',
              textAlign: 'center',
            }}
          >
            {thread.user.name}
            {Moment(thread.createdAt).format('DD MMMM,YYYY')}
            {/* <Moment date={thread.createdAt} /> */}
          </div>
          {/* <Container className={classes.dummyField}></Container> */}
        </div>
      </Grid>
      <Divider
        classes={{
          root: classes.rootDivider,
        }}
        variant="fullWidth"
      />

      <Grid style={{ margin: '15px' }}>
        <Typography style={{ marginBottom: '10px' }} variant="h6">
          {thread.title}
        </Typography>
        {thread.text}
      </Grid>
    </Paper>
  );
}
