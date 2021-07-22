import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { Edit } from '@material-ui/icons';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  commentContainer: {
    display: 'flex',
    width: '80%',
    margin: '10px 0px 10px 0px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // '& > *': {
    //   margin: '5px',
    // },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  itemContainer: {
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
      <Grid
        className={classes.itemContainer}
        container
        direction="row"
        style={{
          flexWrap: 'nowrap',
          flexGrow: '1',
          // padding: '10px',
          // background: '#60519833',
        }}
        alignItems="center"
      >
        <Avatar alt={comment.user.name} src={comment.user.avatar} />
        <Grid
          item
          xs={12}
          sm={10}
          style={{
            flexGrow: '1',
            background: '#60519833',
            borderRadius: '10px',
            padding: '10px',
            whiteSpace: 'pre-line',
          }}
        >
          <Typography
            style={{
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {comment.user.name}
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Edit /> <Delete />
            </span>
          </Typography>
          <Typography style={{ flexGrow: '1', wordBreak: 'break-all' }}>
            {comment.text}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
