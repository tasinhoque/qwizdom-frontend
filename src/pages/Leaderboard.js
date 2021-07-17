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

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  leaderboard: {
    marginTop: '30px',
    marginBottom: '10px',
  },
  quizName: {
    marginBottom: '30px',
  },
  image: {
    borderRadius: '50%',
  },
});

export default function Leaderboard() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const { id } = useParams();

  useEffect(async () => {
    try {
      const res = await api.getLeaderboard(id);
      let tempRows = [];

      for (let i = 1; i <= res.data.length; i++) {
        const { responder, totalPoints, createdAt } = res.data[i - 1];
        const row = createData(
          i,
          responder.name,
          responder.avatar,
          new Date(createdAt),
          totalPoints
        );
        tempRows.push(row);
      }

      setRows(tempRows);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h3" className={classes.leaderboard}>
          Leaderboard
        </Typography>
        <Typography variant="h6" className={classes.quizName}>
          Web Development Fundamentals
        </Typography>
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
                {rows.map(row => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.rank}
                    >
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
    </>
  );
}
