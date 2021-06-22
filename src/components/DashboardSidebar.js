import { Chip, Avatar, Grid, Typography } from '@material-ui/core';
import { Done as DoneIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  chip: {
    marginRight: theme.spacing(1),
  },
  chipGroup: {
    marginBottom: theme.spacing(2),
  },
}));

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
}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={3} className={classes.root}>
      <Typography variant="h4" gutterBottom>
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
          headerText="Subscription"
          firstChipText="Subscribed"
          secondChipText="Unsubscribed"
          firstChipSelected={subscribedSelected}
          secondChipSelected={unsubscribedSelected}
          setFirstChipSelected={setSubscribedSelected}
          setSecondChipSelected={setUnsubscribedSelected}
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
      </Grid>
    </Grid>
  );
};

export default DashboardSidebar;
