import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  commentContainer: {
    display: 'flex',
    width: '80%',
    margin: '10px 0px 10px 0px',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *': {
      margin: '5px',
    },
  },
  input: {
    // borderColor: '#60519833 !important',
    // borderRadius: '10px',
    border: 'none',
  },
}));

export default function Comment(props) {
  const comment = props.comment;
  const classes = useStyles();

  return (
    <div className={classes.commentContainer}>
      <Avatar alt={comment.user.name} src={comment.user.avatar} />
      {/* <TextField
        style={{ flexGrow: 1, borderRadius: '10px' }}
        variant="outlined"
        value={comment.text}
        InputProps={{
          readOnly: true,
          classes: { notchedOutline: classes.input },
        }}
      /> */}
      <Grid
        container
        direction="column"
        style={{
          borderRadius: '10px',
          maxWidth: '90%',

          padding: '10px',
          background: '#60519833',
          whiteSpace: 'pre-line',
        }}
        align="flex-start"
      >
        <Typography style={{ fontWeight: '500' }}>
          {comment.user.name}
        </Typography>
        <Typography style={{ maxWidth: '50%', wordWrap: 'break-word' }}>
          {comment.text}
        </Typography>
      </Grid>
    </div>
  );
}
