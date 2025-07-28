import mongoose from "mongoose";
import GenBook from "../Models/bookrev.model.js";

export const getBookReviews = async(req, res) => {
    const { id } = req.params;
    //here id is google_book_id , not a mongodb id, hence mongoose.Types.ObjectId.isValid(id) will not approve
    if(!id){
        return res.status(400).json({ success: false, message: "Book ID is required"});
    }

    try{
        const book = await GenBook.findOne({ google_book_id: id });
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        return res.status(200).json({ success: true, message: "Reviews fetched successfully", reviews: book.reviews });
    }catch(error){
        console.error("Error fetching reviews:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const createGenBook = async(req, res) => {
    const { title, authors, description, google_book_id, cover } = req.body;
    if (!title || !authors || !description || !google_book_id || !cover) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const book = await GenBook.findOne({ google_book_id: google_book_id});
    if(book){
        return res.status(409).json({ success: false, message: "Book already exists in general collection" });
    }

    try{
        const newGenBook = new GenBook({
            title,
            authors,
            description,
            google_book_id,
            cover,
            reviews: [],
        });
        await newGenBook.save();
        res.status(201).json({ success: true, message: "Book created successfully" });
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ success: false, message: "Failed to create book" });
    }
};

export const addReview = async(req, res) => {
    const { id } = req.params; //google_book_id recieved via route params
    const { user_id, rating, review_text } = req.body;
    if(!id || !user_id || !rating || !review_text){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if(!mongoose.Types.ObjectId.isValid(user_id)){
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try{
        const book = await GenBook.findOne({ google_book_id: id });
        if(!book){
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        const newReview = {
            user_id: user_id,
            book_id: book._id,
            review_text: review_text,
            rating: rating,
        }
        book.reviews.push(newReview);
        await book.save();
        return res.status(201).json({ success: true, message: "Review added successfully" });
    }catch(error){
        console.error("Error adding review:", error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}