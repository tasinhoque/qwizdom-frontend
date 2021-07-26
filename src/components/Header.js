import React from 'react';
import { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '350px',
    maxHeight: '500px',
  },
  grow: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  createQuiz: {
    marginTop: theme.spacing(2.5),
    marginRight: theme.spacing(3),
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    // display: 'block',
    color: theme.palette.common.gray,
    fontFamily: 'Rammetto One',
    marginLeft: theme.spacing(2),
  },
  logo: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default withRouter(function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const onMenuItemClick = val => async e => {
    if (!val.isRead) {
      try {
        console.log(val.id);
        await api.markAsRead(val.id);
      } catch (error) {}
    }
    props.history.push(val.link);
    setAnchorElement(null);
  };

  let user = JSON.parse(localStorage.getItem('user'));

  useEffect(async () => {
    try {
      let response = await api.getNotifications();
      setNotifications(response.data);

      response = await api.getUnreadCount();
      setUnreadCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogOut = () => {
    localStorage.clear();
    props.history.push('/');
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const gotoProfile = event => {
    props.history.push('/profile');
  };

  const gotoQuizCreation = event => {
    props.history.push('/create');
  };
  const gotoMyQuizzes = event => {
    props.history.push('/my-quiz');
  };

  const logout = event => {
    props.history.push('/');
  };

  const handleBellClick = event => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorElement(null);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={gotoProfile}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar alt={user.name} src={user.avatar} />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={gotoMyQuizzes}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AddBoxOutlinedIcon />
        </IconButton>
        <p>My Quizzes</p>
      </MenuItem>

      <MenuItem onClick={gotoQuizCreation}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AddBoxOutlinedIcon />
        </IconButton>
        <p>Create Quiz</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsNoneOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ background: '#2E3B55', color: '#f5f5f5' }}
      >
        <Toolbar>
          <div
            className={classes.logo}
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/dashboard')}
          >
            <img src="/assets/images/logo.png" width="50" />
            <Typography className={classes.title} variant="h5" noWrap>
              Qwizdom
            </Typography>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div
              className={classes.createQuiz}
              onClick={() => props.history.push('/tasks')}
            >
              Tasks
            </div>
            <div className={classes.createQuiz} onClick={gotoMyQuizzes}>
              My Quizzes
            </div>
            <div className={classes.createQuiz} onClick={gotoQuizCreation}>
              Create Quiz
            </div>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleBellClick}
            >
              <Badge badgeContent={unreadCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorElement}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              keepMounted
              open={Boolean(anchorElement)}
              onClose={handleClose}
              style={{ width: '100%' }}
              classes={{ paper: classes.paper }}
            >
              {notifications.length === 0 && (
                <MenuItem>You're All Caught Up For Now</MenuItem>
              )}
              {notifications.map((val, idx) => (
                <div key={idx}>
                  <MenuItem
                    onClick={onMenuItemClick(val)}
                    style={{
                      whiteSpace: 'normal',
                      width: '100%',
                    }}
                  >
                    <span
                      style={
                        val.isRead
                          ? { fontWeight: '300' }
                          : { color: 'black', fontWeight: '400' }
                      }
                    >
                      {val.text}{' '}
                      <span
                        style={
                          val.isRead
                            ? { fontSize: '12px' }
                            : {
                                color: 'grey',
                                fontSize: '12px',
                                fontWeight: '500',
                              }
                        }
                      >
                        {val.createdAt &&
                          new Date(val.createdAt).toLocaleDateString('en-US', {
                            minute: '2-digit',
                            hour: 'numeric',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                      </span>
                    </span>
                  </MenuItem>
                  {idx < notifications.length - 1 && (
                    <Divider style={{ height: '2px' }} />
                  )}
                </div>
              ))}
              {/* <MenuItem
                onClick={handleClose}
                style={{ whiteSpace: 'normal', width: '100%' }}
              >
                My account
                <Typography variant="caption" style={{ marginLeft: '8px' }}>
                  1:27 PM
                </Typography>
              </MenuItem> */}
            </Menu>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={gotoProfile}
              color="inherit"
            >
              <Avatar alt={user.name} src={user.avatar} />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogOut}>
              <ExitToAppIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
});
