import { gql } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';


const typeDefs = gql`
type User{
    _id: ID!
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    mobile: Int
}


type Query {
    userdetail: [User!],
    me: User,
    user(userID: ID!): User,
    chats(sender: ID!, receiver: ID!): [Chat]

}

input TakeDetail{
    firstName: String
    lastName: String 
    email: String 
    password: String
    mobile: Int
}

type Mutation {
    signup(takedetail: TakeDetail): UserUpdateResponse
    signin(email: String, password: String): UserUpdateResponse
    delete(userId: ID!): Boolean!
    sendMessage(sender: ID!, receiver: ID!, message: String!): Chat
}

type UserUpdateResponse{
    success: Boolean!,
    message: String,
    userdetail: User,
    friends: [User]
}
type UserLoggedInResponse{
    message: String
}

type Chat {
    _id: ID!,
    sender: ID!
    receiver: ID!
    created_at: String!
    message: String!
   
    
}

type Subscription {
    userCreated: User
    userUpdated(id: ID!): User
    messageSent(sender: ID!, receiver: ID!): Chat
}
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;
  

