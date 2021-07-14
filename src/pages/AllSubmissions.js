import { useRef, useState, useEffect } from 'react';
import { SingleCard } from '../components';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import CircularProgress from '@material-ui/core/CircularProgress';

import api from '../api';
import { Header, DashboardBody, DashboardSidebar } from '../components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

export default function AllSubmissions() {
  const classes = useStyles();
  return (
    <>
      <Header />

      <div className={classes.root}>
        <p>Okay</p>
      </div>
    </>
  );
}
