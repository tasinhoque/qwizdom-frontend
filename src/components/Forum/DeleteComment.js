import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import api from '../../api';

export default function DeleteComment({
  delOpen,
  setDelOpen,
  commentId,
  setPageRefresher,
}) {
  const handleClickOpen = () => {
    setDelOpen(true);
  };

  const handleClose = () => {
    setDelOpen(false);
  };
  const handleDelete = () => {
    api.deleteComment(commentId).then(res => {
      console.log(res);
      setPageRefresher(Math.random());
      setDelOpen(false);
    });
  };

  return (
    <div>
      <Dialog
        open={delOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        <DialogContent style={{ height: '130px', width: '320px' }}>
          <DialogContentText
            style={{ fontSize: '20px', fontWeight: '500' }}
            id="alert-dialog-description"
          >
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CLOSE
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
