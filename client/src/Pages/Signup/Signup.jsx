import React, { Component } from 'react'
import './Signup.css';
import MutationSignUp from '../../Component/MutationSignUp';



export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      password: '',

    }

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
 


  render() {
    const { firstName, lastName, email, password } = this.state;
    const mobile = this.state.mobile !== '' ? parseInt(this.state.mobile) : '';

    return (
      <div id="login-box">
        <div className="leftTop">Sign Up</div>
        <div className="left">
          <input type="text" value={firstName} name="firstName" placeholder="First Name" onChange={e => this.handleChange(e)} required/>
          <input type="text" value={lastName} name="lastName" placeholder="Last name" onChange={e => this.handleChange(e)} required />
          <input type="text" value={email} name="email" placeholder="E-mail" onChange={e => this.handleChange(e)} required />
          <input type="text" value={mobile} name="mobile" placeholder="Mobile" onChange={e => this.handleChange(e)} required />
          <input type="password" value={password} name="password" placeholder="Password" onChange={e => this.handleChange(e)} required />
          <MutationSignUp data={{ firstName, lastName, email, mobile, password }}/>
         </div>

      </div>

    )
  }
}




