import React, { useState } from 'react';
import { useEffect } from 'react';
import { SingleCard } from '../components';
import Pagination from '@material-ui/lab/Pagination';
import { Typography, TextField, Grid } from '@material-ui/core';
import api from '../api';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

function DashboardBody({
  loading,
  setLoading,
  totalPages,
  setTotalPages,
  quizzes,
  setQuizzes,
}) {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }
    setLoading(true);
    api
      .getQuizzes(`page=${page}&limit=4`)
      .then(res => {
        setTotalPages(res.data.totalPages);
        setQuizzes(res.data.results);
        console.log(res);
        setLoading(false);
      })
      .catch(e => {});
  }, [page]);

  const pageChange = (_event, num) => {
    setPage(num);
  };

  const keyPress = async e => {
    if (e.keyCode === 13) {
      try {
        setLoading(true);
        const response = await api.getQuizzes(
          `page=${page}&limit=4&name=${name}`
        );

        setQuizzes(response.data.results);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        style={{
          // display: 'flex',
          // justifyContent: 'center',
          padding: '20px 0px 35px 0px',
          position: 'relative',
        }}
      >
        <Typography style={{ display: 'inline' }} variant="h4">
          Quizzes
        </Typography>
        <TextField
          variant="outlined"
          style={{ position: 'absolute', right: '100px' }}
          value={name}
          onKeyDown={keyPress}
          onChange={e => setName(e.target.value)}
        />
      </div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginRight: '100px',
            }}
          >
            {quizzes.map(q => {
              return <SingleCard {...q} key={q.id} />;
            })}
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Pagination
              count={totalPages}
              onChange={pageChange}
              page={page}
              color="secondary"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(DashboardBody);
