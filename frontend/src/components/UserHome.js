import { Link, useParams } from "react-router-dom";
import BookDetails from "./BookDetails";
import { useEffect, useState } from "react";
import Axios from "axios";
import Header from "./Header";


const UserHome = ()=>{
    const {userId} =useParams();
    const [books,setBooks] = useState([])

    const getBook= async () => {
        
        try {
        const response = await Axios.get(`/api/getbook/${userId}`)
           setBooks(response.data|| []);
        } catch (error) {
            console.error(error);
            alert('Signup failed');
        }
      }

      useEffect(()=>{
        getBook();
    },[]);

    return(
        <>
         <Header />
        <div className="bg-background bg-cover bg-center min-h-screen p-4 text-center">
          <button className="text-white text-3xl border-2 border-white rounded-xl hover:bg-orange-300/70 hover:text-black hover:border-black p-2 bg-black/70 my-2"><Link to={`/updateinfo/${userId}`}>Update your Info</Link></button><br></br>
          <button className="text-white text-3xl border-2 border-white rounded-xl hover:bg-orange-300/70 hover:text-black hover:border-black p-2 bg-black/70 my-2"><Link to="/addbook">Add Reviews</Link></button>
          <hr className="border-t-2 border-white my-4"></hr>
          <p className="text-white text-3xl mt-2">Your Reviews</p>
          <div className="flex flex-wrap justify-evenly text-center">
          {books.map((book, index) => (
                <BookDetails key={index} book={book} userId={userId} /> 
           ))}
          </div> 
        </div>
        </>
    )
}

export default UserHome;