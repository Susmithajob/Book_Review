import  Axios  from "axios";
import { useEffect, useState } from "react";
import BookReview from "./BookReview";
import Header from "./Header";
import Pagination from "./Pagination";


const ViewReview =()=>{
    const [books,setBooks] = useState([]);
    const [searchBook,setSearchBook] = useState('');
    const getBook= async () => {  
      try {
         const response = await Axios.get(`/api/getbook`)
         setBooks(response.data);
    
      } catch (error) {
          console.error(error);
          alert('Failed to retrive reviews');
      }
    }
    const searchBookName = async ()=>{
      try {
        const response = await Axios.get(`/api/searchbook`, {
          params: { bookName: searchBook },
        })
           const result = response.data;
           if(!result)
           {
            setBooks([])
           }
           else if (Array.isArray(result)) {
            setBooks(result);  
          } else if (result) {
          setBooks([result]);   
        }} catch (error) {
            console.error(error);
            alert('Failed to find book');
        }
    }

    useEffect(()=>{
      getBook();
  },[]);
  return(
    <>
    <Header />
        <div className="bg-background bg-cover bg-center min-h-screen p-4 ">
        <input className="w-1/3 h-8 border-gray-100 rounded-md bg-amber-100 m-4 text-lg pl-2" placeholder="Search Books" onChange={(e) => { setSearchBook(e.target.value) }}></input>
        <button className="p-1 border-black border-2 rounded-md bg-white" onClick={searchBookName}>Search</button>
          
           <Pagination books={books} />
           </div>

    </>
  )
}
export default ViewReview;