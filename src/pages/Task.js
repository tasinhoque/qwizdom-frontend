import {
  Paper,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../api';
import { Header } from '../components';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  headerText: {
    marginTop: '40px',
  },
}));

const Task = () => {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [pendingCounts, setPendingCounts] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    setLoading(true);
    try {
      let creatorResponse = await api.getTasksForCreator();
      let participantResponse = await api.getTasksForParticipant();

      setPendingCounts(creatorResponse.data);
      setUpcomingQuizzes(participantResponse.data);
    } catch (error) {}
    setLoading(false);
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Paper square style={{ marginTop: '10px' }}>
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="fullWidth"
          >
            <Tab label="Pending Submissions" {...a11yProps(0)} />
            <Tab label="Upcoming Quizzes" {...a11yProps(1)} />
          </Tabs>
        </Paper>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '20px',
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            <TabPanel value={value} index={0}>
              <Paper>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quiz Name</TableCell>
                        <TableCell align="center">
                          Pending Submission Count
                        </TableCell>
                        <TableCell align="center">Submissions Page</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingCounts.map(({ quiz, count }, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="center">{quiz.name}</TableCell>
                          <TableCell align="center">{count}</TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() =>
                                history.push(`/quiz/${quiz.id}/submissions`)
                              }
                              variant="contained"
                              color="primary"
                            >
                              visit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              {!pendingCounts.length ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '40px',
                    fontWeight: '300',
                    fontSize: '20px',
                  }}
                >
                  No data available
                </div>
              ) : null}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Paper>
                <TableContainer>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quiz Name</TableCell>
                        <TableCell align="center">Start Time</TableCell>
                        <TableCell align="center">Quiz Home Page</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {upcomingQuizzes.map((quiz, idx) => (
                        <TableRow key={idx}>
                          <TableCell align="center">{quiz.name}</TableCell>
                          <TableCell align="center">
                            {new Date(quiz.startTime).toLocaleDateString(
                              'en-US',
                              {
                                minute: '2-digit',
                                hour: 'numeric',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              }
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              onClick={() =>
                                history.push(`/quiz/${quiz.id}/home`)
                              }
                              variant="contained"
                              color="primary"
                            >
                              visit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              {!upcomingQuizzes.length ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '40px',
                    fontWeight: '300',
                    fontSize: '20px',
                  }}
                >
                  No data available
                </div>
              ) : null}
            </TabPanel>
          </div>
        )}
      </Container>
    </>
  );
};

export default Task;
