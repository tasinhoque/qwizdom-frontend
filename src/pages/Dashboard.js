import React from 'react';
import api from '../api';

import { Header } from '../components';
import { Grid } from '@material-ui/core';
import { DashboardBody } from '../components';

export default function Dashboard() {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item sm={3}>
          <div> navbar space</div>
        </Grid>

        <Grid item sm={8}>
          <DashboardBody />
        </Grid>
      </Grid>
    </>
  );
}
