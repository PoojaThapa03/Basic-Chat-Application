import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default class UserMenu extends Component {
  state = {
    auth: true,
    anchorEl: null,
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        {auth && (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />


            </IconButton>
            <strong>
            </strong>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )
        }
      </div>
    )
  }
}
