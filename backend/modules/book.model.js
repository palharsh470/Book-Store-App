import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        default : "other",
        enum : ["friction", "science", "politics", "economy", "biopic", "social", "religion", "other" ]
    },
    subcategory : {
         type : String,
        required : true,
        enum : ["new", "trending", "evergreen", "featured"]
    },
    rating : {
        type : Number,
        required : true,
        default : 0
    },
    format : {
        type : String,
        required : true,
    },
    language : {
        type : String,
        required : true,
    },
    author :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "bookStoreUser",
        required : true
    }

})

const Book = mongoose.model("Books", bookSchema);

export default Book;