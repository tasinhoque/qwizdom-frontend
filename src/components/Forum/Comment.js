import { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Container,
  Divider,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { Edit } from '@material-ui/icons';
import Delete from '@material-ui/icons/Delete';
import DeleteComment from './DeleteComment';
import api from '../../api';

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
  const user = JSON.parse(localStorage.getItem('user'));
  const [delOpen, setDelOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const commentRef = useRef('');
  console.log(props);
  const updateComment = () => {
    comment.text = commentRef.current.value;
    const patchBody = {
      text: commentRef.current.value,
    };
    setEditMode(false);

    api
      .updateComment(comment.id, patchBody)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className={classes.commentContainer}>
      <DeleteComment
        delOpen={delOpen}
        setDelOpen={setDelOpen}
        commentId={comment.id}
        setPageRefresher={props.setPageRefresher}
      />

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
            {user.id == comment.user.id && editMode == false && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Edit
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setEditMode(true);
                  }}
                />
                <Delete
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setDelOpen(true);
                  }}
                />
              </span>
            )}
          </Typography>
          {editMode ? (
            <>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  style={{ width: '100%' }}
                  multiline
                  autoFocus
                  defaultValue={comment.text}
                  inputRef={commentRef}
                  onFocus={e =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  style={{ paddingBottom: '0px' }}
                  onClick={() => {
                    updateComment();
                    setEditMode(false);
                  }}
                >
                  UPDATE
                </Button>
                <Button
                  style={{ paddingBottom: '0px' }}
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <Typography style={{ flexGrow: '1', wordBreak: 'break-all' }}>
              {comment.text}
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
