import React from 'react';
import { Grid } from '@material-ui/core';

import { Header, DashboardBody } from '../components';

export default function Dashboard() {
  return (
    <>
      <Header />
      <Grid container>
        <Grid item md={3}>
          <div> navbar space</div>
        </Grid>

        <Grid item sm={12} md={9}>
          <DashboardBody />
        </Grid>
      </Grid>
    </>
  );
}
