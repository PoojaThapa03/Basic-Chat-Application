import React from 'react'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import { withRouter } from "react-router-dom";



const ADD_TODO = gql`
  mutation Signup($takedetail: TakeDetail) {
    signup(takedetail: $takedetail) {
      success
      message
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



const MutationSignUp = ({ data, history }) => {
  return (
    <div>
      <Mutation mutation={ADD_TODO}>
        {(signup) => {
          return (
            <>
              
              <button className="button" type="submit" style={{ marginLeft: "100px" }} onClick={e => {
                e.preventDefault();
                if ((data.firstName && data.lastName && data.email && data.mobile && data.password) === "") {
                  alert("All field below must be filled out");
                  return false;
                } else {
                  signup({ variables: { takedetail: ({ ...data }) } }).then((res) => {
                    console.log(res);
                    history.push({pathname: '/welcome', state: { ...res.data.signup }});
                  })


                };


              }}>Sign me up</button>
            </>
          )
        }}
      </Mutation>
    </div>
  );
};



export default withRouter(MutationSignUp);
