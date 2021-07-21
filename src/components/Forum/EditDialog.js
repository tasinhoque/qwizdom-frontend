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

export default function EditDialog({
  thread,
  open,
  setOpen,
  setPageRefresher,
}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('xs');
  const titleRef = useRef(thread.title);
  const bodyRef = useRef(thread.text);

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
    await api.patchDiscussionThread(thread.id, postBody).then(res => {
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
        <DialogTitle id="form-dialog-title">Edit current thread</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid align=" center" item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                type="email"
                fullWidth
                variant="filled"
                label="Title"
                defaultValue={thread.title}
                inputRef={titleRef}
              />
            </Grid>

            <Grid container style={{ paddingTop: '10px' }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Discussion Body"
                  multiline
                  rows={10}
                  rowsMax={10}
                  type="email"
                  fullWidth
                  variant="filled"
                  defaultValue={thread.text}
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
