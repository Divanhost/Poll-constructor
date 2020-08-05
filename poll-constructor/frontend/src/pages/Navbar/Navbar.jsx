import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
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

export const Navbar = (logOut, loggedIn, currentUser) => {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(loggedIn);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <a href="/home" className="title">Poll Constructor</a>
          </Typography>
          <div>
            {auth &&
              <Button variant="contained" color="primary" href="/constructor">
                + Create Poll
              </Button>
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
                    // TODO: WTF
                    logOut.logOut();
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