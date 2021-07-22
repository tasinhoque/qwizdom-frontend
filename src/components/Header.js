import React from 'react';
import { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    width: '350px',
  },
  grow: {
    flexGrow: 1,
    position: 'sticky',
    top: 0,
    zIndex: 1,
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

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  let user = JSON.parse(localStorage.getItem('user'));

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
    props.history.push('/creation-basic');
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
          {/* <IconButton */} {/*   edge="start" */}
          {/*   className={classes.menuButton} */}
          {/*   color="inherit" */}
          {/*   aria-label="open drawer" */}
          {/* > */}
          {/*   <MenuIcon /> */}
          {/* </IconButton> */}
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
            <div className={classes.createQuiz} onClick={gotoQuizCreation}>
              Create Quiz
            </div>
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleBellClick}
            >
              <Badge badgeContent={17} color="secondary">
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
              <MenuItem
                onClick={handleClose}
                style={{
                  whiteSpace: 'normal',
                  width: '100%',
                }}
              >
                {/* <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                > */}
                <span>
                  The quick brown fox jumped over the lazy dog. The quick brown
                  fox jumped over the lazy dog dot dot.{' '}
                  <span style={{ color: 'grey', fontSize: '12px' }}>
                    1:27 PM, 10 July 2021
                  </span>
                </span>
                {/* <Typography
                  variant="caption"
                  // align="right"
                  // style={{ minWidth: '80px' }}
                >
                  {/* <div>19 Jul 2021</div> 
                  1:27 PM
                </Typography> */}
                {/* </div> */}
              </MenuItem>
              <Divider style={{ height: '2px' }} />
              <MenuItem
                onClick={handleClose}
                style={{ whiteSpace: 'normal', width: '100%' }}
              >
                My account
                <Typography variant="caption" style={{ marginLeft: '8px' }}>
                  1:27 PM
                </Typography>
              </MenuItem>
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
