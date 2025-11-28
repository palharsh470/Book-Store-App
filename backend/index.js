import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { createUser, login } from "./controllers/user.controller.js";
import cors from "cors"
import{ addBook, addBookToFavourite, deleteBook, getBooks, getFavouriteBooks, getLoggedUserBooks, updateBook } from "./controllers/book.controller.js";
import authorisation from "./middlewares/authmiddleware.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors())


server.post("/user", createUser);
server.post("/login", login)
server.post("/book/create",authorisation, addBook)
server.post("/books", getBooks)
server.post("/books/loggeduser",authorisation, getLoggedUserBooks)
server.delete("/book/:id/delete",authorisation, deleteBook)
server.patch("/book/:id/update",authorisation, updateBook)
server.post("/book/favourite/:id/create",authorisation, addBookToFavourite)
server.get("/book/favourite",authorisation, getFavouriteBooks)


mongoose.connect(process.env.DB_URL).then(()=>{
    server.listen(3000, ()=>{
        console.log("server started")
    })
})