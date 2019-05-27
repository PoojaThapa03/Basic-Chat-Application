import gql from 'graphql-tag';
import ChatHistory from './ChatHistory/ChatHistory.jsx';
import React from 'react';
import { Query } from 'react-apollo';

const MESSAGE_QUERY = gql`
  query Chats ($sender: ID!, $receiver: ID!){
    chats(sender:$sender, receiver: $receiver) {
      _id
      sender
      receiver
      message
      created_at
    }
  }
`;

const MESSAGE_SEND_SUBSCRIPTION = gql`
subscription onMessageSent($sender: ID!, $receiver: ID!){
    messageSent(sender:$sender, receiver: $receiver){
        _id
        sender
        message
        created_at
    }
}

`
const SubscriptionMessageSend = ({ sender, receiver }) => (
    <Query
        query={MESSAGE_QUERY}
        variables={{ sender, receiver }}
    >
        {({ subscribeToMore, refetch, ...result }) => (
            <ChatHistory
                {...result}
                currentUser={sender}
                subscribeToNewMessage={() =>
                    subscribeToMore({
                        document: MESSAGE_SEND_SUBSCRIPTION,
                        variables: { sender, receiver },
                        updateQuery: () => refetch()
                    })
                }
            />
        )}
    </Query>
);
export default SubscriptionMessageSend;