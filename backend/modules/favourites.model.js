import mongoose from "mongoose";

const favouriteSchema = mongoose.Schema({
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "bookStoreUser",
        required : true
    },
    book : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Books",
        required : true,
    }
})

const favourites = mongoose.model("Favourite", favouriteSchema);

export default favourites;