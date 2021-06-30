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
  root: {},
  buttons: {
    position: 'relative',
    // width: '100%',
  },
  editButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(10),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  textField: {
    '& input': {
      color: '#000000',
    },
    '& input:disabled': {
      color: '#444444',
    },
  },
  imageContainer: {
    position: 'relative',
    margin: theme.spacing(1),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  editAvatar: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  gridList: {
    width: '70%',
    height: 450,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const nameRef = useRef('');
  const emailRef = useRef('');
  const avatar = useRef(null);
  const [formDisabled, disableForm] = useState(!false);
  const [img, setImg] = useState(null);
  const [errMsg, setErrMsg] = useState(' ');
  const [userName, setUserName] = useState(' ');
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [queryString, setQueryString] = useState(
    'isTimeBound=true&isScheduled=true&isTest=false'
  );

  const user = JSON.parse(localStorage.getItem('user'));
  // setUserName(user.name);

  // console.log(user);
  // console.log(user.name);

  const saveProfile = async event => {
    let res;
    disableForm(true);

    event.preventDefault();
    const profileBody = {
      name: nameRef.current.value,
      email: emailRef.current.value,
    };

    user.name = nameRef.current.value;
    user.email = emailRef.current.value;
    res = await api
      .editProfile(profileBody)
      .then(res => {
        console.log(res);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        disableForm(false);
        setErrMsg(error.response.data.message);
        console.log(error.response.data.message);
      });

    // console.log(img);
    if (img != null) {
      let formData = new FormData();
      formData.append('avatar', avatar.current);
      formData.append('fileUpload', true);
      console.log(formData);
      res = await api
        .editAvatar(formData)
        .then(res => {
          console.log(res.data.avatar);
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(error => {
          setErrMsg(error.response.data.message);
          console.log(error.response.data.message);
        });
    }
  };

  // const handleTextField = e => {
  //   setUserName(e.target.value);
  // };

  const cancelEdit = async event => {
    let res;
    disableForm(true);
    setImg(null);
    nameRef.current = user.name;
    emailRef.current = user.email;
    refreshPage();
  };

  const handleImage = e => {
    console.log(e);
    if (e.target.files.length !== 0) {
      setImg(URL.createObjectURL(e.target.files[0]));
      avatar.current = e.target.files[0];
      console.log('image added', e.target.files[0]);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }

    try {
      setLoading(true);
      // updateQueryString();
      const response = await api.getQuizzes(queryString);
      // console.log(response.data.results);

      setQuizzes(response.data.results);
      // setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />

      <Grid container className={classes.root}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item md={12} xs={12}>
            <Grid container className={classes.imageContainer}>
              {!img && (
                <Avatar
                  alt="Remy Sharp"
                  src={user.avatar}
                  className={classes.avatar}
                />
              )}
              {img && (
                <Avatar alt="Remy Sharp" src={img} className={classes.avatar} />
              )}
              <input
                accept="image/*"
                className={classes.input}
                id="avatarImg"
                multiple
                type="file"
                onChange={handleImage}
                disabled={formDisabled}
              />
              <div className={classes.editAvatar}>
                <label htmlFor="avatarImg">
                  <Fab component="span">
                    <EditIcon />
                  </Fab>
                </label>
              </div>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              defaultValue={user.name}
              disabled={formDisabled}
              label="Name"
              className={classes.textField}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              inputRef={nameRef}
            ></TextField>
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              label="Email"
              defaultValue={user.email}
              disabled={formDisabled}
              className={classes.textField}
              inputProps={{ min: 0, style: { textAlign: 'center' } }}
              inputRef={emailRef}
            ></TextField>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ color: 'red' }}>{errMsg.toString()}</p>
            </div>
          </Grid>
        </Grid>
        <Grid container justify="center">
          {formDisabled && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.editButton}
              onClick={() => disableForm(false)}
              disabled={!formDisabled}
            >
              Edit
            </Button>
          )}
          {!formDisabled && (
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.editButton}
                onClick={saveProfile}
                disabled={formDisabled}
              >
                Save
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.editButton}
                onClick={cancelEdit}
                disabled={formDisabled}
              >
                Cancel
              </Button>
            </div>
          )}
        </Grid>
        <Grid container justify="center">
          {loading ? (
            <div style={{}}>
              <CircularProgress color="secondary" />
            </div>
          ) : (
            <GridList cellHeight={320} className={classes.gridList} cols={4}>
              {quizzes.map(q => {
                return (
                  <Grid
                    item
                    key={q.id}
                    xs={12}
                    md={6}
                    style={{ marginBottom: '20px' }}
                  >
                    <SingleCard {...q} key={q.id} />
                  </Grid>
                );
              })}
              ;
            </GridList>
          )}
        </Grid>
        {/* <GridListTile cols={2} key={q.id}> */}
        {/*   <SingleCard {...q} key={q.id} /> */}
        {/* </GridListTile> */}
      </Grid>
    </>
  );
}