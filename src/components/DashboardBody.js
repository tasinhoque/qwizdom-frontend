import React from 'react';
import { SingleCard } from '../components';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

export default function DashboardBody() {
  const array1 = [1, 2, 3, 4];

  return (
    <>
      <div style={{ padding: '10px' }}>
        <Typography variant="h4">Quizzes</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        {array1.map((i) => {
          return <SingleCard />;
        })}
      </div>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination count={10} color="secondary" />
      </div>
    </>
  );
}
