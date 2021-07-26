import { useRef, useState, useEffect } from 'react';
import {
  Chip,
  Avatar,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Select,
  Input,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

import { useTheme, makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import { Done as DoneIcon } from '@material-ui/icons';

import api from '../api';
import { Header, SingleCard } from '../components';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: theme.spacing(5, 10, 5, 10),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  pageHeader: {
    width: '100%',
    margin: theme.spacing(0, 0, 1, 0),
  },
  filterChipsContainer: {
    margin: theme.spacing(0, 0, 8, 0),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  searchFieldStyle: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  category: {
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  muiChip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ClickableChip = ({
  selected,
  setSelected,
  label,
  classes,
  secondChipSelected,
  setSecondChipSelected,
}) => (
  <Chip
    className={classes.chip}
    avatar={
      selected ? (
        <Avatar>
          <DoneIcon />
        </Avatar>
      ) : (
        <></>
      )
    }
    label={label}
    clickable
    color="primary"
    onClick={() => {
      if (selected) {
        setSelected(false);
      } else {
        if (secondChipSelected) {
          setSecondChipSelected(false);
        }
        setSelected(true);
      }
    }}
  />
);

const ChipGroup = ({
  classes,
  headerText,
  firstChipText,
  secondChipText,
  firstChipSelected,
  setFirstChipSelected,
  secondChipSelected,
  setSecondChipSelected,
}) => (
  <Grid item className={classes.chipGroup}>
    <ClickableChip
      classes={classes}
      selected={firstChipSelected}
      setSelected={setFirstChipSelected}
      label={firstChipText}
      secondChipSelected={secondChipSelected}
      setSecondChipSelected={setSecondChipSelected}
    />
    <ClickableChip
      classes={classes}
      selected={secondChipSelected}
      setSelected={setSecondChipSelected}
      label={secondChipText}
      secondChipSelected={firstChipSelected}
      setSecondChipSelected={setFirstChipSelected}
    />
  </Grid>
);

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

  const [queryString, setQueryString] = useState(
    'page=1&limit=6&isPublished=true'
  );

  const [tempName, setTempName] = useState(name);

  const [names, setNames] = useState([]);
  const [personName, setPersonName] = useState([]);
  const theme = useTheme();

  const handleChange = event => {
    const arr = event.target.value;
    setPersonName(arr);

    const ids = [];
    names.forEach(({ name, id }) => {
      if (arr.includes(name)) {
        ids.push(id);
      }
    });

    setCategoryIds(ids);
  };

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
    let str = `page=${page}&limit=6&isPublished=true`;

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
      let response = await api.getQuizzes(`${queryString}`);
      console.log(response);

      setQuizzes(response.data.results);
      setTotalPages(response.data.totalPages);

      response = await api.getCategories();
      setNames(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [queryString]);

  // useEffect(async () => {
  //   try {
  //     setLoading(true);
  //     const response = await api.getQuizzes(queryString);

  //     setQuizzes(response.data.results);
  //     setTotalPages(response.data.totalPages);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [queryString]);

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
              className={classes.searchFieldStyle}
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
        <Grid container spacing={1} className={classes.filterChipsContainer}>
          <Grid
            container
            justify="flex-start"
            item
            md={8}
            className={classes.filterChips}
          >
            <ChipGroup
              classes={classes}
              // headerText="Quiz Type"
              firstChipText="Test"
              secondChipText="Survey"
              firstChipSelected={testSelected}
              secondChipSelected={surveySelected}
              setFirstChipSelected={setTestSelected}
              setSecondChipSelected={setSurveySelected}
            />
            <ChipGroup
              classes={classes}
              // headerText="Schedule Type"
              firstChipText="Scheduled"
              secondChipText="Unscheduled"
              firstChipSelected={scheduledSelected}
              secondChipSelected={unscheduledSelected}
              setFirstChipSelected={setScheduledSelected}
              setSecondChipSelected={setUnscheduledSelected}
            />
            <ChipGroup
              classes={classes}
              // headerText="Time"
              firstChipText="Time Bound"
              secondChipText="Not Time Bound"
              firstChipSelected={timeBoundSelected}
              secondChipSelected={notTimeBoundSelected}
              setFirstChipSelected={setTimeBoundSelected}
              setSecondChipSelected={setNotTimeBoundSelected}
            />
          </Grid>
          <Grid
            container
            justify="flex-end"
            item
            md={4}
            className={classes.filterChips}
          >
            <FormControl className={classes.category} variant="filled">
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-mutiple-chip-filled-label"
                id="demo-mutiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.muiChip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {names.map(({ name, id }) => (
                  <MenuItem
                    key={id}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Grid container direction="column" className={classes.pageContainer}>
            <Grid container item className={classes.cardCotainer} spacing={2}>
              {quizzes.map(q => {
                return (
                  <Grid
                    container
                    justify="center"
                    item
                    md={4}
                    className={classes.cards}
                    key={q.id}
                  >
                    <SingleCard style={{ width: '320px' }} {...q} key={q.id} />
                  </Grid>
                );
              })}
            </Grid>
            <Grid
              container
              justify="center"
              item
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
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
