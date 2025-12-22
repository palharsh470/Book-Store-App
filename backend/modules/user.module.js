import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    }
})

const user = mongoose.model("bookStoreUser", userSchema);

export default user;