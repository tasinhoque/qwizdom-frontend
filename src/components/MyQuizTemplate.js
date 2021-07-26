import { useRef, useState, useEffect } from 'react';
import { SingleCard } from '../components';
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Container,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import { functionsIn } from 'lodash';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: '1',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansionClass: {
    '&$expanded': {
      margin: '0px 0px 10px 0px',
    },
  },
  expanded: {},
}));

export default function MyQuizTemplate(props) {
  const classes = useStyles();
  const quizzes = props.quizzes;
  const history = useHistory();

  return (
    <>
      {' '}
      <div className={classes.root}></div>
      <Accordion defaultExpanded={props.type == 'Published Quizzes'}>
        <AccordionSummary
          classes={{
            root: classes.expansionClass,
            expanded: classes.expanded,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5">{props.type}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {quizzes.length == 0 ? (
            <Typography align="center" style={{ width: '100%' }}>
              {' '}
              No Quiz Data Available
            </Typography>
          ) : (
            <Paper style={{ width: '100%' }}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" style={{ minWidth: '400px' }}>
                        Quiz Name
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: '400px' }}>
                        Category
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: '200px' }}>
                        Home Page
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quizzes.map((quiz, idx) => (
                      <TableRow key={idx}>
                        <TableCell style={{ paddingLeft: '50px' }} align="left">
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              style={{
                                marginRight: '20px',
                                height: '40px',
                                width: '60px',
                              }}
                              alt={quiz.name}
                              src={quiz.coverImage}
                            />
                            {quiz.name}
                          </span>
                        </TableCell>
                        <TableCell align="center">
                          <span>{quiz.categories[0].name}</span>
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
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}
