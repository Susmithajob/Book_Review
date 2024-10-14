import { useState } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const AddBook = ()=>{
  const navigate = useNavigate();
      const [bookName, setBookName] = useState('');
      const [author, setAuthor] = useState('');
      const [reviewText, setReviewText] = useState('');
      const [rating, setRating] = useState('');

    const addBook = async (e) => {
        e.preventDefault();
        try{
          const token = localStorage.getItem('token');
          
          const response = await Axios.post(`${process.env.API_URL}/addbook`, {
            bookName,
            author,
            reviewText,
            rating
          }, {
            headers: { 'Authorization': token }  
          });
          console.log(response.data)
          const userId = response.data;
          navigate(`/userhome/${userId}`);

        }catch (error) {
          console.error(error);
          alert('Book adding failed');
      } 
      }
    return(
      
        <>
        <Header />
        <div className="bg-background bg-cover bg-center min-h-screen min-w-scrren p-4">
        <h2 className="text-center text-4xl font-bold text-white">Add Book Details</h2>
        <div className="border-2 border-black p-6 mx-auto w-2/3 md:w-96 sm:w-72 w-min-60 mt-4 rounded-lg bg-amber-50/20">
        <form onSubmit={addBook}>
            <label className="text-white text-xl">Name of Book</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2"placeholder="Book Name" type="text" onChange={(e) => { setBookName(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Name of Author</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="Author Name" type="text" onChange={(e) => { setAuthor(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Your Review</label><br></br>
            <textarea className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="Add Review Here" type="text" onChange={(e) => { setReviewText(e.target.value) }}></textarea><br></br>
            <label className="text-white text-xl">Your Rating</label><br></br>
            <select className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={rating} onChange={(e) => { setRating(e.target.value) }}>
             <option value="">Select Rating</option>
             <option value="1">★</option>
             <option value="2">★★</option>
             <option value="3">★★★</option>
             <option value="4">★★★★</option>
             <option value="5">★★★★★</option>
             </select>
             <div className="flex justify-center mt-4">
                        <button className="p-1 border-black border-2 rounded-md bg-white" type="submit">Add</button>
                </div>
        </form>
        </div>
        </div>
        </>

    )
}

export default AddBook;