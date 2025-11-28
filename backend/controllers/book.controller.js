import Book from "../modules/book.model.js";
import favourites from "../modules/favourites.model.js";

export async function addBook(req, res){

    try{

        const body = req.body;
        const user = req.user
        

    if(!body.title.trim() || !body.format.trim() || !body.language.trim()){
        return res.json({
            success : false,
            message : "All fields are required"
        })
    }

    body.title = body.title.trim()
    body.language = body.language.trim()
    body.format = body.format.trim()
    body.author = user._id


    const createBook = await Book.create(body)

    console.log(createBook)
    
    res.json({
        success : true,
        data : createBook
    })
    
} catch(err){
    res.json({
        success : true,
        message : err.message || "something went wrong"
    })
}

}

export async function getBooks(req, res){
    try{
        const query = req.query.category
        const filter = req.body.subcategory

        const booksRecord = await Book.find({
            category : query,
            subcategory : filter
        }).populate("author", "username")
   
        res.json({
            success : true,
            data : booksRecord
        })
    }
    catch(err){

        res.json({
            success : false,
            message : err.message || "something went wrong"
        })
    }


}
export async function deleteBook(req, res){
    try{

        const loggedAuthor = req.user;
        const bookId = req.params.id;

        const bookToDelete = await Book.findById(bookId);

        if(!bookToDelete){
            res.json({
            success : false,
            message : "Book not available"
        })
        }

        if(loggedAuthor._id != bookToDelete.author.toString()){
            res.json({
            success : false,
            message : "Only the owner can delete the book"
        })
        }


        const deletedBook =await bookToDelete.deleteOne()
        res.json({
            success : true,
            data : deletedBook
        })
    }
    catch(err){

        res.json({
            success : false,
            message : err.message || "something went wrong"
        })
    }


}

export async function updateBook(req, res){
    try{

        const loggedAuthor = req.user;
        const bookId = req.params.id;
        const body = req.body

        const bookToUpdate = await Book.findById(bookId);
console.log(loggedAuthor)
        if(!bookToUpdate){
            res.json({
            success : false,
            message : "Book not available"
        })
        }

        if(loggedAuthor._id != bookToUpdate.author.toString()){
            res.json({
            success : false,
            message : "Only the owner can update its book"
        })
        }


        const updatedBook =await bookToUpdate.updateOne(body)
        res.json({
            success : true,
            data : updatedBook
        })
    }
    catch(err){

        res.json({
            success : false,
            message : err.message || "something went wrong"
        })
    }


}

export async function getLoggedUserBooks(req, res) {
    try{

        const user = req.user;
        const loggedUserId = user._id;

        const userBooks = await Book.find({
            author : loggedUserId
        })
        
        res.json({
            success : true,
            data : userBooks
        })
    }
    catch(err){
        res.json({
            success : false,
            message : err.message || "Something went wrong"
        })
    }

    
}

export async function getFavouriteBooks(req, res) {
    try{

        
        const loggedUser = req.user;
        
        const favouriteBooks = await favourites.find({
            author : loggedUser._id
        }).populate("book")

        res.json({
            success : true ,
             data : favouriteBooks
        })


    }catch(err){
         res.json({
            success : false,
            message : err.message || "Something went wrong"
        })
    }
    
}
export async function addBookToFavourite(req, res) {
    try{

        const bookId = req.params.id
        const loggedUser = req.user;
        
        const favouriteBook = await favourites.create({
            author : loggedUser._id,
            book : bookId
        })

        res.json({
            success : true ,
             data : favouriteBook
        })


    }catch(err){
         res.json({
            success : false,
            message : err.message || "Something went wrong"
        })
    }
    
}