import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
const app = express();
const api = express.Router();
import BookDetail from './Schemas/bookDetails.js';
import User from "./Schemas/user.js";
import cors from "cors";
import bodyParcer from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


dotenv.config();
app.use(express.json());
app.use('/api', api);

const PORT=process.env.PORT || 5000



app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));
app.use(bodyParcer.json());


//Connecting to server and database
mongoose.connect(process.env.MONGODB_STRING)
    .then(()=>{
        console.log("Connected to database");
        app.listen(PORT,()=>{
            console.log(`Server is running in ${PORT}`);
        })
    })
    .catch((err)=>{
        console.log(err)
    });

    const verifyToken = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('Access denied');
      
        try {
          const verified = jwt.verify(token, process.env.JWT_SECRET);
          req.user = verified; // Attach user data to the request
          next();
        } catch (err) {
          res.status(400).send('Invalid token');
        }
      };


//Saving a book review
api.post('/addbook',verifyToken, async function(req, res) {
    const {bookName,author,reviewText,rating} = req.body;
    const userId = req.user._id;
    try{
    if (!bookName || !author || !reviewText || !rating) {
      return res.status(400).send('All fields are required');
    }
    const existingBook = await BookDetail.findOne({ bookName: new RegExp(`^${bookName}$`, 'i') });

    if (existingBook) {
        // Check if the user has already reviewed this book
        const userReviewIndex = existingBook.reviewText.findIndex(review => review.userId === userId);

        if (userReviewIndex !== -1) {
            // If the user has already reviewed the book, update the existing review
            existingBook.reviewText[userReviewIndex].review = reviewText;
            existingBook.reviewText[userReviewIndex].rating = rating;
            
        } else {
            // If the user hasn't reviewed the book, add a new review
            existingBook.reviewText.push({ review: reviewText, userId: userId,rating: rating });
            
        }

        await existingBook.save();
        return res.json(userId);}
    else{
    var bookData = new BookDetail({
        bookName: bookName,
        author: author,
        reviewText: [{ review: reviewText, userId: userId,rating: rating }]//check
        
    });
         await bookData.save(); 
         return res.json(userId);
    }}
    catch (err) {
        console.error(err);
        return res.status(500).send('Failed to add book');
    }

});

//Signing up a user

api.post(`/signup`, async function(req, res) {
    const {name,email,password} = req.body;
    try{
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }
    var userData = new User({
        name: name,
        email: email,
        password: password
    });
    userData.password = await bcrypt.hash(password,10);
    await userData.save(); 
    return res.json({ userId: userData._id,userName:userData.name });
    //return res.json(); 
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Failed to Sign Up');
    }

});



//Signing in

api.post('/signin',async function(req,res){
    const {email,password} = req.body;
    try{
        
        if (!email || !password) {
          return res.status(400).send('All fields are required');
        }
        const user = await User.findOne({email});
        if (!user) {
          return res.status(404).send('User not found');
        }
        const passwordCheck = await bcrypt.compare(password,user.password)
        if(!passwordCheck)
        return res.status(404).send('Something went wrong');
        const jwtToken = jwt.sign({name:user.name,
            email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'}
        )
        
        return res.json({
            token: jwtToken,
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            }
        });
        
      } 
        catch (err) {
            console.error(err);
            res.status(500).send('Failed to Sign Up');
        }
    
    });

//Getting a book reviews of a single user
api.get('/getbook/:id', async function(req, res) {
     try 
     {
            const userId = req.params.id;
            const response = await BookDetail.find({ 'reviewText.userId': userId });
            res.json(response);
    } catch (err) {
            console.error(err);
            res.status(500).send('Failed to retrieve book details');
    }
});

//Getting all book reviews 
api.get('/getbook', async function(req, res) {
    try 
    {
           
           const response = await BookDetail.find({});
           res.json(response);
          
   } catch (err) {
           console.error(err);
           res.status(500).send('Failed to retrieve book details');
   }
});

//Searching book reviews 
api.get('/searchbook', async function(req, res) {
    try 
    {
           const book = req.query.bookName;
         
           const response =await BookDetail.findOne({ bookName: new RegExp(`^${book}$`, 'i') });
           
           res.json(response);
   } catch (err) {
           console.error(err);
           res.status(500).send('Failed to retrieve book details');
   }
});

//Deleting a review
api.delete('/deletebook', async function(req, res) {
    try 
    {
        const { bookId, userId } = req.body;
        const book = await BookDetail.findById(bookId);
        const index = book.reviewText.findIndex(review => review.userId === userId);
       
        if (index === -1) {
            return res.status(404).send('Review not found');
        }
        book.reviewText.splice(index, 1);
        await book.save();
        res.status(200).send('Review deleted successfully');  
    }catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
   }
});

//Updating a review
api.put('/updatebook', async function(req, res) {
    try 
    {
        const { bookId, userId, newReview, newRating } = req.body;
        const book = await BookDetail.findById(bookId);
        const index = book.reviewText.findIndex(review => review.userId === userId);
        book.reviewText[index].review=newReview;
        book.reviewText[index].rating=newRating;
        await book.save();
        res.status(200).send('Review updated successfully');  
    }catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve book details');
   }
});
    
//getting user info
api.get('/updateinfo/:id', async function(req, res){
    const userId = req.params.id;
    try{
    const user = await User.findById(userId).select('-password');
    res.json(user);
    }catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }

});

//update user info
api.post('/updateinfo/:id', async function(req, res){
    const userId = req.params.id;
    const {name,email,password} = req.body;
    try{
    if (!name || !email || !password) {
      return res.status(400).send('All fields are required');
    }
    
    const user = await User.findById(userId);
    user.name=name;
    user.email=email;
    user.password=await bcrypt.hash(password,10);
    await user.save();
    res.json()
    }catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }

});

