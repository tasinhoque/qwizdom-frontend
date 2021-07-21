import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';

const useStyles = makeStyles(theme => ({
  rootDivider: {
    height: '2px',
    // backgroundColor: 'black'
  },
  paperStyle: {
    // minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
  },
  headerContainer: {
    display: 'flex',
    flexGrow: '1',
    cursor: 'pointer',
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
  footer: {
    width: 'fit-content',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    '& > *': {
      marginRight: '4px',
    },
    '&:hover': {
      backgroundColor: '#60519833',
    },
  },
}));

export default function ThreadCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const thread = props.thread;
  console.log(props);
  const { id } = useParams();

  const routeFullThread = () => {
    history.push(`/quiz/${id}/forum-thread/${thread.id}`);
  };

  return (
    <Paper className={classes.paperStyle} variant="outlined" square>
      <Grid container style={{ borderRadius: '6px' }}>
        {/* <Paper style={{ flexGrow: 1, padding: '15px' }}> */}
        <div className={classes.headerContainer} onClick={routeFullThread}>
          <Avatar alt={thread.user.name} src={thread.user.avatar} />
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}
          >
            <Typography style={{ fontWeight: '500' }}>
              {thread.user.name}{' '}
            </Typography>
            <Typography style={{ fontWeight: '500' }}>
              {Moment(thread.createdAt).format('DD MMMM, YYYY')}
            </Typography>
          </div>
        </div>
      </Grid>
      <Divider
        classes={{
          root: classes.rootDivider,
        }}
        variant="fullWidth"
      />

      <Grid
        style={{
          margin: '15px 15px 25px 15px',
          whiteSpace: 'pre-line',
          cursor: 'default',
        }}
      >
        <Typography style={{ marginBottom: '10px' }} variant="h6">
          {thread.title}
        </Typography>
        {thread.text}
      </Grid>
      <Divider
        classes={{
          root: classes.rootDivider,
        }}
        style={{ marginBottom: '13px' }}
        variant="fullWidth"
      />
      <div className={classes.footer} onClick={routeFullThread}>
        <ModeCommentOutlinedIcon style={{ fontSize: '30' }} />
        <Typography style={{ fontWeight: '400', fontSize: '16px' }}>
          20 Comments
        </Typography>
      </div>
    </Paper>
  );
}
