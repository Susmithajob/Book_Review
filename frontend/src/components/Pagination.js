import { useState } from "react";
import BookReview from "./BookReview";

const Pagination = ({books})=>{
    const reviewsPerPage = 5;
    
    const [currentPage,setCurrentPage] = useState(1)
    const allReviews = books.flatMap(book => 
    book.reviewText.map(review => ({
      ...review,             
      bookName: book.bookName, 
      author: book.author,    
      rating: review.rating,
           
    }))
  );
  
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage);
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const pageHandler = (newPage) => {
    setCurrentPage(newPage);
  };
    return(
    <>
        <div className="flex flex-wrap justify-evenly">
          {books.length===0 && <h2 className="text-white text-xl mt-4">No Book Found</h2>}
          {paginatedReviews.map((review,index) => (
                <BookReview key={index} review={review}  /> 
           ))}</div>
         <div className="flex justify-center mt-10 ">
        <li
           className={`w-10 h-8 ${
            currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
          } text-black rounded-md border-black border-2 flex items-center justify-center cursor-pointer ml-2`}
          onClick={() => currentPage > 1 && pageHandler(currentPage - 1)}
        >
         
          Prev
        </li>
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            key={i + 1}
            className={`w-8 h-8 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            } rounded-md border-black border-2 flex items-center justify-center cursor-pointer ml-2`}
            onClick={() => pageHandler(i + 1)}
          >
            {i + 1}
          </li>
        ))}
          
          <li
          className={`w-10 h-8 ${
            currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400"
          } text-black rounded-md border-black border-2 flex items-center justify-center cursor-pointer ml-2`}
          onClick={() => currentPage < totalPages && pageHandler(currentPage + 1)}
        >
          Next
        </li>
      </div>
           </>
    )
}

export default Pagination;