import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import api from '../../api';

export default function CreationDialog({
  id,
  open,
  setOpen,
  setPageRefresher,
}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const titleRef = useRef('');
  const bodyRef = useRef('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePost = async () => {
    const postBody = {
      text: bodyRef.current.value,
      title: titleRef.current.value,
    };
    await api.postDiscussionThread(id, postBody).then(res => {
      console.log(res);
      bodyRef.current.value = '';
      setPageRefresher(Math.random());
      setOpen(false);
    });
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle id="form-dialog-title">Create Thread</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <Grid container>
            <Grid xs={2}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography align="center">Title</Typography>
              </div>
            </Grid>

            <Grid align=" center" item xs={10}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="outlined"
                inputRef={titleRef}
              />
            </Grid>

            <Grid container style={{ paddingTop: '10px' }}>
              <Grid xs={2}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Typography>Discussion Body</Typography>
                </div>
              </Grid>
              <Grid xs={10}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  multiline
                  rows={10}
                  rowsMax={10}
                  type="email"
                  fullWidth
                  variant="outlined"
                  inputRef={bodyRef}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePost} color="primary">
            post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
