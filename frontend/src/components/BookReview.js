const BookReview = ({ review }) => {
  const { bookName, author, rating, review: reviewContent } = review;
  
    return (
      <>
      
      <div className="flex justify-between flex-wrap">
              <div className="flex-col bg-amber-100 border-2 border-orange-400 w-48 rounded-lg text-left p-2 m-4 list-none"><ul>
              <li><span className="font-semibold">Name : </span>{bookName}</li>
              <li><span className="font-semibold">Author : </span>{author}</li>
              <li><span className="font-semibold">Review : </span>{reviewContent} </li>
              <li><span className="font-semibold">Rating : </span>{"★".repeat(rating)}</li></ul>   
            </div>
      </div>
      </>
    );
  };
  
  export default BookReview;
  