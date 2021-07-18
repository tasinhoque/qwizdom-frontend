import { useState, useRef, useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import api from '../api';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, ThreadCard } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';

import { ClassNames } from '@emotion/core';

const useStyles = makeStyles(theme => ({
  root: {},

  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '50px',
  },

  typoStyle: {
    fontSize: '1.2rem',
    // paddingTop: '1.2rem',
    marginBottom: '5px',
    // fontWeight: '500',
  },
  textFieldStyle: {
    resize: 'vertical',
    width: '100%',
    padding: '10px',
    marginTop: '10px',
  },
}));

export default function ForumPage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [allThread, setAllThread] = useState(null);
  const { id } = useParams();
  const [currentPageNum, setCurrentPageNum] = useState(0);
  const [pageRefresher, setPageRefresher] = useState(9);

  const postFieldRef = useRef('');

  console.log('id is ', id);
  const pageChange = (_event, num) => {
    setCurrentPageNum(num - 1);
  };
  const textHandler = e => {
    console.log(postFieldRef.current.value);
  };
  const handlePost = async () => {
    const postBody = { text: postFieldRef.current.value };
    await api.postDiscussionThread(id, postBody).then(res => {
      console.log(res);
      setPageRefresher(Math.random());
    });
  };

  useEffect(() => {
    console.log('called');
    api
      .getAllDiscussionThread(id)
      .then(res => {
        console.log(res);
        setTotalPages(res.data.results.totalPages);
        setAllThread(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [pageRefresher]);
  console.log('on forum page');
  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <Header />
          <Grid>
            <Paper>
              <TextField
                className={classes.textFieldStyle}
                inputRef={postFieldRef}
                onChange={textHandler}
                multiline
                rows={4}
                rowsMax={10}
                variant="outlined"
              />
              <Button onClick={handlePost} color="primary" variant="contained">
                Post
              </Button>
            </Paper>
            {allThread.map((th, index) => {
              return <ThreadCard thread={th} key={index}></ThreadCard>;
            })}
            forum page
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              style={{ display: 'flex', justifyContent: 'center' }}
              count={totalPages}
              onChange={pageChange}
              page={currentPageNum + 1}
              color="secondary"
            />
          </div>
        </>
      )}
    </>
  );
}
