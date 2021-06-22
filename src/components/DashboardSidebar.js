import {
  Chip,
  Avatar,
  Grid,
  Typography,
  Select,
  Input,
  FormControl,
  MenuItem,
} from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import api from '../api';

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
    paddingTop: theme.spacing(11),
    paddingLeft: theme.spacing(4),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  chipGroup: {
    marginBottom: theme.spacing(4),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  muiChip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
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
    <Typography variant="h6" gutterBottom>
      {headerText}
    </Typography>
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

const DashboardSidebar = ({
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
}) => {
  const classes = useStyles();
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

  useEffect(async () => {
    const response = await api.getCategories();
    setNames(response.data);
  }, []);

  return (
    <Grid item xs={12} md={3} className={classes.root}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        Filter
      </Typography>
      <Grid container direction="column">
        <ChipGroup
          classes={classes}
          headerText="Quiz Type"
          firstChipText="Test"
          secondChipText="Survey"
          firstChipSelected={testSelected}
          secondChipSelected={surveySelected}
          setFirstChipSelected={setTestSelected}
          setSecondChipSelected={setSurveySelected}
        />
        <ChipGroup
          classes={classes}
          headerText="Schedule Type"
          firstChipText="Scheduled"
          secondChipText="Unscheduled"
          firstChipSelected={scheduledSelected}
          secondChipSelected={unscheduledSelected}
          setFirstChipSelected={setScheduledSelected}
          setSecondChipSelected={setUnscheduledSelected}
        />
        <ChipGroup
          classes={classes}
          headerText="Time"
          firstChipText="Time Bound"
          secondChipText="Not Time Bound"
          firstChipSelected={timeBoundSelected}
          secondChipSelected={notTimeBoundSelected}
          setFirstChipSelected={setTimeBoundSelected}
          setSecondChipSelected={setNotTimeBoundSelected}
        />
        <FormControl className={classes.formControl} variant="filled">
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
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
                  <Chip key={value} label={value} className={classes.muiChip} />
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
  );
};

export default DashboardSidebar;
