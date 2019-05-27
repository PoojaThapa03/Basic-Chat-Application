import mongoose, { Schema } from "mongoose";
var ObjectId = Schema.ObjectId;


const sendMessageEvent = new Schema({
    sender: String,
    receiver: String,
    created_at: Date,
    message: String
})

const user = mongoose.model('sendMessageEvent', sendMessageEvent);

export default user;