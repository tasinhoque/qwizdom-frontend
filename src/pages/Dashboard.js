import { useState } from 'react';
import { Grid } from '@material-ui/core';

import { Header, DashboardBody, DashboardSidebar } from '../components';

export default function Dashboard() {
  const [subscribedSelected, setSubscribedSelected] = useState(false);
  const [unsubscribedSelected, setUnsubscribedSelected] = useState(false);

  const [scheduledSelected, setScheduledSelected] = useState(false);
  const [unscheduledSelected, setUnscheduledSelected] = useState(false);

  const [timeBoundSelected, setTimeBoundSelected] = useState(false);
  const [notTimeBoundSelected, setNotTimeBoundSelected] = useState(false);

  const [testSelected, setTestSelected] = useState(false);
  const [surveySelected, setSurveySelected] = useState(false);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  const dashboardBodyProps = {
    loading,
    setLoading,
    totalPages,
    setTotalPages,
    quizzes,
    setQuizzes,
  };

  const dashboardSidebarProps = {
    subscribedSelected,
    setSubscribedSelected,
    unsubscribedSelected,
    setUnsubscribedSelected,
    scheduledSelected,
    setScheduledSelected,
    unscheduledSelected,
    setUnscheduledSelected,
    timeBoundSelected,
    setTimeBoundSelected,
    notTimeBoundSelected,
    setNotTimeBoundSelected,
    testSelected,
    setTestSelected,
    surveySelected,
    setSurveySelected,
  };

  // useEffect(async () => {
  //   const signedIn = localStorage.getItem('refreshToken');
  //   if (!signedIn) {
  //     props.history.push('/');
  //   }
  //   setLoading(true);
  //   api
  //     .getQuizzes(`page=${page}&limit=4`)
  //     .then(res => {
  //       setTotalPages(res.data.totalPages);
  //       setQuizzes(res.data.results);
  //       console.log(res);
  //       setLoading(false);
  //     })
  //     .catch(e => {});
  // }, [page]);

  return (
    <>
      <Header />
      <Grid container>
        <DashboardSidebar {...dashboardSidebarProps} />

        <Grid item sm={12} md={9}>
          <DashboardBody {...dashboardBodyProps} />
        </Grid>
      </Grid>
    </>
  );
}
