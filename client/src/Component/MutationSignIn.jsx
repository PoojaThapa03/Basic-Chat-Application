import React from 'react'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";


const ADD_TOSignin = gql`
   mutation Signin($email: String, $password: String){
      signin(email: $email, password: $password){
        message
        success
        userdetail{
          _id
          firstName
          lastName
          email
      }
      friends{
        _id
        firstName
        lastName
        email
      }
        
        
  }
}

`;

const MutationSignIn = ({ data, history}) => {
  let redirect = false;

  return (
    <Mutation mutation={ADD_TOSignin}>
      {(signin) => {

        return (
          <>
            <button className="button1" type="submit" onClick={() =>
              signin({ variables: { ...data } }).then((response) => {
                console.log(response)   
                redirect = response.data.signin.message === 'Invalid User' || response.data.errors ? false : true;
                if (redirect === false) {
                  alert('User not found, please sign up first to continue!')
                } else {
                history.push({ pathname: '/welcome', state: { ...response.data.signin } });
                }
              })

            }>
              Log In
          </button>
           
          </>
        )
      }}
    </Mutation>
  )
}

export default withRouter (MutationSignIn);







