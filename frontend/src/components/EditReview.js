import { useState } from "react";
import Axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const EditReview = ()=>{
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, bookName, author, rating, review, userId } = location.state;
  const [newReview,setNewReview] = useState(review);
  const [newRating,setNewRating] = useState(rating);

    const updateBook = async (e) => {
        e.preventDefault();
        try{
          const response = await Axios.put(`${process.env.REACT_APP_API_URL}/updatebook`, {
            newReview,
            newRating,
            bookId,
            userId
          });
          navigate(`/userhome/${userId}`);
        }catch (error) {
          console.error(error);
          alert('Book updation failed');
      } 
      }
    return(
      
        <>
        <Header />
        <div className="bg-background bg-cover bg-center min-h-screen p-4">
        <h2 className="text-center text-4xl font-bold text-white">Update Book Details</h2>
        <div className="border-2 border-black p-6 mx-auto w-2/3 md:w-96 sm:w-72 w-min-60 mt-4 rounded-lg bg-amber-50/20">
        <form onSubmit={updateBook}>
            <label className="text-white text-xl">Name of Book</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2"value={bookName} type="text"></input><br></br>
            <label className="text-white text-xl">Name of Author</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={author} type="text" ></input><br></br>
            <label className="text-white text-xl">Your Review</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={newReview} type="text" onChange={(e) => { setNewReview(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Your Rating</label><br></br>
            <select className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={newRating} onChange={(e) => { setNewRating(e.target.value) }}>
             <option value="">Select Rating</option>
             <option value="1">★</option>
             <option value="2">★★</option>
             <option value="3">★★★</option>
             <option value="4">★★★★</option>
             <option value="5">★★★★★</option>
             </select>
             <div className="flex justify-center mt-4">
                        <button className="p-1 border-black border-2 rounded-md bg-white" type="submit">Update</button>
                </div>
        </form>
        </div>
        </div>
        </>

    )
}

export default EditReview;
