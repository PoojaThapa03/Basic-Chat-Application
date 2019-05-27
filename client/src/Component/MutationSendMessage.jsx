import React from 'react'
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";

const SEND_Message = gql`
   mutation CreateMessage($sender: ID!, $receiver: ID!,$message: String!){
      sendMessage(sender: $sender, receiver: $receiver, message: $message){
       message
  }
}

`;

const MutationSendMessage = ({ data }) => {
 const handleKeyDown = (event, sendMessage) => {
    let newMessage = event.target.value;

    if (event.key === "Enter") {
      sendMessage({ variables: { sender: data.userdetail._id, receiver: data.selectFriend._id, message: newMessage } })
      event.target.value = " ";  
    }
   

  }
  return (
    <Mutation mutation={SEND_Message}>
      {(sendMessage) => {
        return (
          <input
              type="text"
              className="form"
              name="renderInput"
              placeholder="Start conversation... "
              onKeyDown={(event)=>handleKeyDown(event, sendMessage)}
            />
        )
      }}
    </Mutation>
  )
}

export default MutationSendMessage;







