import mongoose, { Schema } from "mongoose";


const signupEvent = new Schema({
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        mobile: Number
    
})
const user = mongoose.model('signupEvent', signupEvent);

export default user;