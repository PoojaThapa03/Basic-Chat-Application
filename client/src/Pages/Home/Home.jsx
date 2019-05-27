import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../Home/Home.css';
import Divider from '@material-ui/core/Divider';
import Signup from '../Signup/Signup';
import MutationSignIn from '../../Component/MutationSignIn';

const styles = {
    root: {
        flexGrow: 1,
        fontSize: "2em",
        fontFamily: " monospace"
    },
    grow: {
        flexGrow: 1,
        textAlign: "center"

    }
};

class ButtonAppBars extends Component {
    state = {
        value: false,
        email: '',
        password: '',
        showInputForm: false
    }
    handleCreate = () => {
        this.setState({ value: true });

    }

    handleChange = (e) => {
        debugger
        this.setState({
            
            [e.target.name]: e.target.value,
            showInputForm: true

        })
    }
    // componentDidUpdate(){
    //     if(this.state.showInputForm){
    //         this.email.focus();
    //         this.password.focus();
    //     }
    // }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        const { email, password } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar style={{ backgroundColor: 'darkblue' }}>
                        <div className={classes.grow}>Chit Chat</div>
                    </Toolbar>
                    <div className="secHeader">You must login first</div><Divider style={{ backgroundColor: "#AD8B0A" }} />
                    <div className="secHeader"><img src="https://img.icons8.com/color/48/000000/two-smartphones.png" alt="img"></img>Get Chit Chat in your phone</div>
                </AppBar>
                {value === true ? <Signup /> :
                    <div id="login-box1">
                        <span className="header">Enter your email address to login</span>
                        <input value = {email} type="text" className="email" name="email" placeholder="E-mail" onChange={(e) => this.handleChange(e)} />
                        <input value = {password} type="password" name="password" placeholder="Password" onChange={(e) => this.handleChange(e)} />
                        <MutationSignIn data={{ email, password }} />
                        <Divider style={{ marginTop: "49px" }}></Divider>
                        <div className="or">OR</div>
                        <button className="button2" type="submit" onClick={this.handleCreate}>Create New Account</button>
                    </div>}
            </div>
        );
    }
}
ButtonAppBars.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ButtonAppBars);
