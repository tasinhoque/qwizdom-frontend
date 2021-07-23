import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { useState, useRef } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import api from '../api';

export default function SubmissionDialog({ id, open, setOpen, caller }) {
  const [value, setValue] = useState(0);
  const review = useRef('');
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push(`/quiz/${id}/home`);
  };
  const ratingChange = e => {
    console.log(e.target.value);
    setValue(parseInt(e.target.value));
  };
  const handlePost = async () => {
    setOpen(false);

    console.log(review.current.value);
    const postBody = {
      rating: value,
      text: review.current.value,
    };
    await api
      .sumbitReviewRating(id, postBody)
      .then(res => {
        console.log('post done');

        history.push(`/quiz/${id}/home`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {caller == 'quizPlay' && (
          <DialogTitle id="form-dialog-title">
            Your script has been submitted successfully
          </DialogTitle>
        )}
        <DialogContent>
          <div component="fieldset">
            <Typography
              style={{
                display: 'flex',
                fontWeight: '430',
                justifyContent: 'space-between',
              }}
            >
              Rating
              <Rating onChange={ratingChange} name="pristine" value={value} />
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography style={{ marginTop: '10px', fontWeight: '430' }}>
              Your Thought
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="email"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              inputRef={review}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
