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
import api from '../api';
import { Header } from '../components';

const useStyles = makeStyles(theme => ({
  headerText: {
    marginTop: '40px',
  },
}));

const Task = () => {
  const history = useHistory();
  const classes = useStyles();
  const [pendingCounts, setPendingCounts] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);

  useEffect(async () => {
    try {
      let creatorResponse = await api.getTasksForCreator();
      let participantResponse = await api.getTasksForParticipant();

      setPendingCounts(creatorResponse.data);
      setUpcomingQuizzes(participantResponse.data);
    } catch (error) {}
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <h1 className={classes.headerText}>Pending Submissions</h1>
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Quiz Name</TableCell>
                  <TableCell align="center">Pending Submission Count</TableCell>
                  <TableCell align="center">Submissions Page</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingCounts.map(({ quiz, count }) => (
                  <TableRow>
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
        <h1 className={classes.headerText}>Upcoming Quizzes</h1>
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
                {upcomingQuizzes.map(quiz => (
                  <TableRow>
                    <TableCell align="center">{quiz.name}</TableCell>
                    <TableCell align="center">
                      {new Date(quiz.startTime).toLocaleDateString('en-US', {
                        minute: '2-digit',
                        hour: 'numeric',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => history.push(`/quiz/${quiz.id}/home`)}
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
      </Container>
    </>
  );
};

export default Task;
