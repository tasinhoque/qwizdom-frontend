import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Header } from '../components';
import { useParams } from 'react-router';
import api from '../api';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { id: 'rank', label: 'Rank' },
  { id: 'participant', label: 'Participant', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'points',
    label: 'Points',
    minWidth: 170,
    align: 'right',
  },
];

const options = { year: 'numeric', month: 'long', day: 'numeric' };

function createData(rank, name, avatar, date, points) {
  return {
    rank,
    participant: { name, avatar },
    date: date.toLocaleDateString('en-US', options),
    points,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '24px',
  },
  container: {
    maxHeight: 440,
  },
  leaderboard: {
    marginTop: '30px',
    marginBottom: '10px',
  },
  quizName: {
    display: 'inline-block',
    marginLeft: '10px',
  },
  image: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  coverImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  paper: {
    minWidth: '50%',
    margin: theme.spacing(3, 0, 6, 0),
  },
  box: {
    marginTop: '-20px',
    padding: theme.spacing(0, 0, 2, 2),
  },
}));

export default function Leaderboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(async () => {
    try {
      let res = await api.getLeaderboard(id);
      let tempRows = [];

      for (let i = 1; i <= res.data.evaluated.length; i++) {
        const { responder, totalPoints, createdAt } = res.data.evaluated[i - 1];
        const row = createData(
          i,
          responder.name,
          responder.avatar,
          new Date(createdAt),
          totalPoints
        );
        tempRows.push(row);
      }

      for (let i = 1; i <= res.data.pending.length; i++) {
        const { responder, createdAt } = res.data.pending[i - 1];
        const row = createData(
          '-',
          responder.name,
          responder.avatar,
          new Date(createdAt),
          'Pending'
        );
        tempRows.push(row);
      }

      setRows(tempRows);

      res = await api.getQuiz(id);
      setQuiz(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Container maxWidth="md">
          <Paper className={classes.paper}>
            <img
              src={quiz.coverImage}
              width="400px"
              className={classes.coverImage}
              alt=""
            />
            <div className={classes.box}>
              <Typography variant="h4" className={classes.leaderboard}>
                Leaderboard,
                <Typography variant="h5" className={classes.quizName}>
                  {quiz.name}
                </Typography>
              </Typography>
              <Typography className={classes.quizInfo}>
                Total Points: {quiz.totalPoints}
              </Typography>
              <Typography className={classes.quizInfo}>
                Total Participants: {quiz.totalParticipants || 0}
              </Typography>
            </div>
          </Paper>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, idx) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                        {columns.map(column => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === 'participant' ? (
                                <Grid container alignItems="center">
                                  <Grid item>
                                    <Box mr={2}>
                                      <img
                                        src={value.avatar}
                                        width="40"
                                        height="40"
                                        alt=""
                                        className={classes.image}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid item>{value.name}</Grid>
                                </Grid>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      )}
    </>
  );
}
