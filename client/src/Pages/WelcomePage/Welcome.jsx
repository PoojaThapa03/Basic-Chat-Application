import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "./welcome.css";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import UserMenu from "../../Component/Structure/UserMenu";
import MutationSendMessage from '../../Component/MutationSendMessage';
import SubscriptionMessageSend from '../../Component/SubscriptionMessageSend';


class ButtonAppBars extends Component {
  state = {
    message: [],
    tempFriends:[],
    search: false
  };

  filterFriends = (e, friends) => {
    let tempFrnz = [...friends],
    searchValue = e.target.value.toLowerCase();
    tempFrnz = tempFrnz.filter(function (item) {
      return item.firstName.toLowerCase().search(
        searchValue) !== -1;
    });
    
    this.setState({ 
      tempFriends: tempFrnz,
      search: !this.state.search
    
    });
  }

  addFriends = data => {
    this.setState((state, props) => ({
      selectFriend: data
    }));
  };

  render() {
    let { friends, userdetail } = this.props.history.location.state;
    const { selectFriend } = this.state;
    friends = this.state.search === true? [...this.state.tempFriends] : friends;

    return (
      <>
        <div className="root">
          <AppBar position="relative">
            <Toolbar style={{ backgroundColor: "darkblue" }}>
              <UserMenu />
              {userdetail.firstName}
              <div className="grow">Chit Chat</div>

              {selectFriend && selectFriend.firstName}
            </Toolbar>
          </AppBar>
        </div>

        <Grid container spacing={16}>
          <Grid item sm={4} className="leftGrid">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase name="inputBase" placeholder="Search…" onChange={(e) => this.filterFriends(e, friends)} />
            <table>
              <tbody>
                {friends.map((cat, index) => (
                  <tr key={index} name="friends">
                    <td>
                      <Fab
                        size="small"
                        variant="extended"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.addFriends(cat)}
                      >
                        <AddIcon />
                      </Fab>

                      {cat.firstName}
                      <br />
                      <br />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item sm={8} className="vl">
            {selectFriend && [
              <MutationSendMessage data={{ userdetail, selectFriend }} key={selectFriend._id} />,
              <SubscriptionMessageSend  {...{ sender: userdetail._id, receiver: selectFriend._id }} key={userdetail._id} />,
            ]}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ButtonAppBars;
