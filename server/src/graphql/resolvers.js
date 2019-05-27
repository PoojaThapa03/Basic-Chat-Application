import { PubSub, withFilter } from 'apollo-server';
import signupEvent from '../models/signupEvent';
import sendMessageEvent from '../models/sendMessageEvent';



const USER_CREATED = 'USER_CREATED';
const USER_UPDATED = 'USER_UPDATED';
const CHAT_CHANNEL = 'CHAT_CHANNEL';
const MESSAGE_SEND = "messageSent";

let pubsub = new PubSub();
let Userdetails = [];
let chats = [];
let saveSignup = {};
const resolvers = {
    Query: {
        userdetail: () => {
            return signupEvent.find().lean()
        },
        me: () => {
            return Userdetail
        },
        chats: async(root, args) => {
            const { sender, receiver } = args;
            return sendMessageEvent.find({ $or: [{ sender, receiver }, { sender: receiver, receiver: sender }] }).lean()
        }

    },
    Mutation: {
        signup: async (parent, args, context, info) => {
            const newUser = { ...args.takedetail }
            Userdetails.push(newUser);
            saveSignup = new signupEvent({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                mobile: newUser.mobile

            })
            saveSignup.save();
            let userdetails = await signupEvent.find({}).lean();
            let filter = userdetails.filter((user) => user._id !== newUser._id)
            console.log(filter)
            pubsub.publish(USER_CREATED, { userCreated: newUser })
            return ({
                success: true,
                message: true,
                userdetail: saveSignup,
                friends: filter
            })
        },
        signin: async (parent, args, context, info) => {
            let userdetails = await signupEvent.find({}).lean(),
                findUser = userdetails.find(record => {return record.email === args.email && record.password === args.password}),
                message = findUser !== undefined ? `${findUser.lastName}` + 'Signed In successfully' : 'Invalid User',
                filter = findUser !== undefined ? userdetails.filter(user => user._id !== findUser._id): null;
            
            return ({
                success: true,
                message: message,
                userdetail: findUser,
                friends: filter

            })
        },
        delete: (root, { userId }) => {
            const ids = parseInt(userId);
            let filtered = Userdetails.filter(function (el) {
                return el.id != ids;
            });
            if (filtered.length === 0) {
                return false;
            } else {
                Userdetails = filtered;
                return true;
            }
        },
        sendMessage: async (root, { sender, receiver, message }) => {
            const chat = { sender, receiver, created_at: Date.now(), message }
            chats.push(chat)
            console.log(chat)
            const saveMessage = new sendMessageEvent({
                sender: chat.sender,
                receiver: chat.receiver,
                created_at: chat.created_at,
                message: chat.message

            })
            saveMessage.save();
            console.log(saveMessage);
            pubsub.publish(MESSAGE_SEND, { messageSent: saveMessage })
            return saveMessage
        }
    },
    Subscription: {
        userCreated: {
            subscribe: () => pubsub.asyncIterator([USER_CREATED]),
        },
        // userUpdated: {
        //     subscribe: withFilter(
        //         () => pubsub.asyncIterator('USER_UPDATED'),
        //         (payload, variables) => {
        //             return payload.userUpdated.id === variables.id;
        //         },
        //     ),
        // },
        messageSent: {
            subscribe: () => pubsub.asyncIterator([MESSAGE_SEND]),

        }
    }
}


export default resolvers;