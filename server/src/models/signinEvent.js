import mongoose, { Schema } from "mongoose";


const signinEvent = new Schema({
    email: String,
    password: String,


})
const user = mongoose.model('signinEvent', signinEvent);

export default user;