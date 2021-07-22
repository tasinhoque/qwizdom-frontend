import { useRef, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../api';
import { Header, SingleCard } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: theme.spacing(5, 10, 5, 10),
  },
  pageHeader: {
    width: '100%',
    margin: theme.spacing(0, 9, 5, 9),
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [scheduledSelected, setScheduledSelected] = useState(false);
  const [unscheduledSelected, setUnscheduledSelected] = useState(false);

  const [timeBoundSelected, setTimeBoundSelected] = useState(false);
  const [notTimeBoundSelected, setNotTimeBoundSelected] = useState(false);

  const [testSelected, setTestSelected] = useState(false);
  const [surveySelected, setSurveySelected] = useState(false);

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);

  const [queryString, setQueryString] = useState('');

  const [tempName, setTempName] = useState(name);

  const pageChange = (_event, num) => {
    setPage(num);
  };

  const keyPress = async e => {
    if (e.keyCode === 13) {
      setName(tempName);
    }
  };

  const dashboardBodyProps = {
    loading,
    totalPages,
    quizzes,
    page,
    setPage,
    name,
    setName,
  };

  const dashboardSidebarProps = {
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
    setCategoryIds,
  };

  const updateQueryString = () => {
    let str = `page=${page}&limit=4&isPublished=true`;

    if (testSelected) {
      str += '&isTest=true';
    } else if (surveySelected) {
      str += '&isTest=false';
    }

    if (timeBoundSelected) {
      str += '&isTimeBound=true';
    } else if (notTimeBoundSelected) {
      str += '&isTimeBound=false';
    }

    if (scheduledSelected) {
      str += '&isScheduled=true';
    } else if (unscheduledSelected) {
      str += '&isScheduled=false';
    }

    if (name !== '') {
      str += `&name=${name}`;
    }

    if (categoryIds.length > 0) {
      categoryIds.forEach(id => {
        str += `&categories=${id}`;
      });
    }

    setQueryString(str);
  };

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }

    try {
      setLoading(true);
      const response = await api.getQuizzes(`page=1&limit=4`);

      setQuizzes(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      setLoading(true);
      const response = await api.getQuizzes(queryString);

      setQuizzes(response.data.results);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [queryString]);

  useEffect(() => {
    updateQueryString();
  }, [
    surveySelected,
    testSelected,
    scheduledSelected,
    unscheduledSelected,
    timeBoundSelected,
    notTimeBoundSelected,
    page,
    name,
    categoryIds,
  ]);

  return (
    <>
      <Header />
      <div className={classes.root}>
        <Grid container justify="space-between" className={classes.pageHeader}>
          <Grid item>
            <Typography style={{ display: 'inline' }} variant="h4">
              Quizzes
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              // style={{ position: 'absolute', minWidth: '300px', right: '100px' }}
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
          </Grid>
        </Grid>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Grid container direction="column" className={classes.pageContainer}>
            <Grid container item className={classes.cardCotainer}>
              {quizzes.map(q => {
                return (
                  <Grid
                    container
                    justify="center"
                    item
                    md={6}
                    className={classes.cards}
                    key={q.id}
                  >
                    <SingleCard {...q} key={q.id} />;
                  </Grid>
                );
              })}
            </Grid>
            <Grid
              container
              justify="center"
              item
              className={classes.paginateContainer}
            >
              <Pagination
                count={totalPages}
                onChange={pageChange}
                page={page}
                color="secondary"
              />
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
