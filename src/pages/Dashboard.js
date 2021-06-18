import React from 'react';
import { Grid } from '@material-ui/core';

import { Header, DashboardBody, DashboardSidebar } from '../components';

export default function Dashboard() {
  return (
    <>
      <Header />
      <Grid container>
        <DashboardSidebar />

        <Grid item sm={12} md={9}>
          <DashboardBody />
        </Grid>
      </Grid>
    </>
  );
}
