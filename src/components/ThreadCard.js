import { useState, useRef, useEffect } from 'react';
import { Grid, Paper, Typography, Container, Divider } from '@material-ui/core';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'moment';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Edit } from '@material-ui/icons';
import Delete from '@material-ui/icons/Delete';
import CreationDialog from './Forum/CreationDialog';
import EditDialog from './Forum/EditDialog';
import DeleteDialog from './Forum/DeleteDialog';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles(theme => ({
  rootDivider: {
    height: '2px',
    // backgroundColor: 'black'
  },
  paperStyle: {
    // minHeight: '200px',
    flexGrow: 1,
    padding: '15px',
    maxWidth: '100%',
    wordBreak: 'break-word',
  },
  headerContainer: {
    display: 'flex',
    flexGrow: '1',
    justifyContent: 'center',
    '& > *': {
      margin: '5px',
    },
  },
  arrowStyle: {
    fontSize: '35px',
    cursor: 'pointer',
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
  const user = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  let up = false,
    down = false;
  if (thread.upvotes.includes(user.id)) {
    console.log('already upvoted');
    up = true;
  }
  if (thread.downvotes.includes(user.id)) {
    down = true;
    console.log('already downVoted');
  }
  const [upUser, setUpUser] = useState(up);
  const [downUser, setDownUser] = useState(down);
  const [voteCount, setVoteCount] = useState(
    thread.upvotes.length - thread.downvotes.length
  );
  const routeFullThread = () => {
    history.push(`/quiz/${id}/forum/thread/${thread.id}`);
  };
  useEffect(() => {
    setVoteCount(thread.upvotes.length - thread.downvotes.length);
  }, [props.thread]);

  const handleUpVote = () => {
    if (upUser) {
      setVoteCount(prev => {
        prev--;
        return prev;
      });
      api
        .upVoteFlip(thread.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setUpUser(false);
      return;
    }
    if (downUser) {
      setVoteCount(prev => {
        prev++;
        setDownUser(false);

        return prev;
      });
      api
        .downVoteFlip(thread.id)
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
    setUpUser(true);

    setVoteCount(prev => {
      prev++;
      return prev;
    });
    api
      .upVoteFlip(thread.id)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDownVote = () => {
    if (downUser) {
      setVoteCount(prev => {
        prev++;
        return prev;
      });
      api
        .downVoteFlip(thread.id)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      setDownUser(false);
      return;
    }
    if (upUser) {
      setVoteCount(prev => {
        prev--;
        setUpUser(false);

        return prev;
      });
      api.upVoteFlip(thread.id);
    }
    setDownUser(true);
    setVoteCount(prev => {
      prev--;
      return prev;
    });
    api
      .downVoteFlip(thread.id)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Paper className={classes.paperStyle} variant="outlined" square>
      <EditDialog
        thread={thread}
        open={open}
        setOpen={setOpen}
        setPageRefresher={props.setPageRefresher}
      />
      <DeleteDialog
        delOpen={delOpen}
        setDelOpen={setDelOpen}
        threadId={thread.id}
        setPageRefresher={props.setPageRefresher}
      />

      <Grid container style={{ borderRadius: '6px' }}>
        {/* <Paper style={{ flexGrow: 1, padding: '15px' }}> */}
        <div className={classes.headerContainer}>
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
            <div style={{ display: 'inline-flex' }}>
              {thread.user.id == user.id && (
                <>
                  <Edit
                    onClick={() => setOpen(true)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Delete
                    onClick={() => setDelOpen(true)}
                    style={{ cursor: 'pointer' }}
                  />
                </>
              )}
            </div>
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
          display: 'flex',
          flexDirection: 'row',
          margin: '15px 15px 25px 0px',
          whiteSpace: 'pre-line',
          cursor: 'default',
          maxWidth: '100%',
          alignItems: 'center',
        }}
      >
        <div
          direction="column"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyItems: 'center',
            alignItems: 'center',
            width: '30px',
            marginRight: '10px',
          }}
        >
          <ArrowDropUpIcon
            onClick={handleUpVote}
            className={classes.arrowStyle}
            style={upUser == true ? { color: 'green' } : { color: 'black' }}
          />
          <span style={{ fontSize: '14px', fontWeight: '500' }}>
            {' '}
            {voteCount}
          </span>
          <ArrowDropDownIcon
            className={classes.arrowStyle}
            onClick={handleDownVote}
            style={downUser == true ? { color: 'red' } : { color: 'black' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            whiteSpace: 'pre-line',
          }}
        >
          <div
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              flxWrap: 'wrap',
              fontSize: '17px',
              fontWeight: '500',
            }}
          >
            <div>{thread.title}</div>
            <div>{Moment(thread.createdAt).format('DD MMMM, YYYY')}</div>
          </div>
          <div
            style={{
              // wordBreak: 'break-all',
              whiteSpace: 'pre-line',
              fontSize: '16px',
              fontWeight: '400',
            }}
          >
            {thread.text}
          </div>
        </div>
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
          {thread.totalComments <= 1
            ? `${thread.totalComments} Reply`
            : `${thread.totalComments} Replies`}
        </Typography>
      </div>
    </Paper>
  );
}
