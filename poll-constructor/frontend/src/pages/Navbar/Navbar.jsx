import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { CustomModal, Login, Register } from '../../components';
import { Button } from '@material-ui/core';
import "./Navbar.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#fff !important'
  },
}));

export const Navbar = (props) => {
  const classes = useStyles();
  const [auth, setAuth] = useState(props.loggedIn);
  const [user, setUser] = useState(props.currentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setAuth(props.loggedIn);
    setUser(props.currentUser);
  }, [props.loggedIn, props.currentUser]);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className='flex-navbar'>
        <div className='d-links'>
          <h5>
            <a href="/home" className="title">Test project site</a>
          </h5>
          <h6>
            <a href="/home" className="link">Polls</a>
          </h6>
          <h6>
            <a href="/home" className="link">Answers</a>
          </h6>
        </div>
        <div className='d-links'>
          {auth &&
            <div className='d-links'>
              <Button variant="contained" color="primary" href="/constructor" className='mr-3'>
                + Create Poll
              </Button>
              <div className="login">
                {user}
              </div>
            </div>
          }
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {
                !auth ?
                  <div>
                    <MenuItem onClick={handleClose}>
                      <CustomModal
                        isOpen ={false}
                        clickElRef={
                          <div>
                            Login
                        </div>
                        }
                      >
                        <Login>
                        </Login>
                      </CustomModal>
                    </MenuItem>
                    <div className="dropdown-divider"></div>
                    <MenuItem onClick={handleClose}>
                      <CustomModal
                        isOpen ={false}
                        clickElRef={
                          <div>
                            Register
                        </div>
                        }
                      >
                        <Register>
                        </Register>
                      </CustomModal>
                    </MenuItem>
                  </div>
                  :
                  <MenuItem onClick={(e) => {
                    props.logOut();
                    setAuth(false);
                    handleClose();
                  }}>
                    LogOut
                </MenuItem>
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}