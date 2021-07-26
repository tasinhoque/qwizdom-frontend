import React, { useState } from 'react';
import { SingleCard } from '../components';
import Pagination from '@material-ui/lab/Pagination';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

function DashboardBody({
  loading,
  totalPages,
  quizzes,
  page,
  setPage,
  name,
  setName,
}) {
  const [tempName, setTempName] = useState(name);

  const pageChange = (_event, num) => {
    setPage(num);
  };

  const keyPress = async e => {
    if (e.keyCode === 13) {
      setName(tempName);
    }
  };

  return (
    <>
      <div
        style={{
          padding: '20px 0px 35px 0px',
          position: 'relative',
        }}
      >
        <Typography style={{ display: 'inline' }} variant="h4">
          Quizzes
        </Typography>
        <TextField
          variant="outlined"
          style={{ position: 'absolute', minWidth: '300px', right: '100px' }}
          value={tempName}
          onKeyDown={keyPress}
          onChange={e => setTempName(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ fill: 'gray' }} />
              </InputAdornment>
            ),
          }}
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
              margin: '20px 0px 20px 0px',
              display: 'flex',
              justifyContent: 'center',
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
