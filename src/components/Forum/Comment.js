import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  commentContainer: {
    margin: '15px',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    '& > *': {
      margin: '5px',
    },
  },
}));

export default function Comment(props) {
  const comment = props.comment;
  const classes = useStyles();

  return <div className={classes.commentContainer}>{comment.text}</div>;
}
