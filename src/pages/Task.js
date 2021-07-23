import {
  Grid,
  Paper,
  Typography,
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
import api from '../api';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  upcomingQuizCard: {
    padding: '32px',
  },
  quizName: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: 'blue',
    },
  },
}));

const Task = () => {
  const history = useHistory();
  const classes = useStyles();
  const [pendingCounts, setPendingCounts] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);

  useEffect(async () => {
    try {
      let response = await api.getTasksForCreator();
      setPendingCounts(response.data);

      response = await api.getTasksForParticipant();
      setUpcomingQuizzes(response.data);
    } catch (error) {}
  }, []);

  return (
    <>
      <h1>Tasks</h1>
      <p>{JSON.stringify(pendingCounts)}</p>
      <h1>Participant</h1>
      <Container maxWidth="md">
        <Paper>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Quiz Name</TableCell>
                  <TableCell align="center">Start Time</TableCell>
                  <TableCell align="center">Link</TableCell>
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
