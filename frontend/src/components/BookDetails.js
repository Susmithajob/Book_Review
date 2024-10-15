
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const BookDetails = (props)=>{
    const {book,userId} = props;
    const {_id: bookId,bookName,author,reviewText} = book;
    const userReview = reviewText.find(review => review.userId === userId);
    const stars = "★".repeat(userReview.rating);
    const navigate = useNavigate();

    const deleteReview = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/deletebook`, {
                data: { bookId, userId }
            });
            alert('Review deleted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };
    const editReview =()=>
    {
        navigate('/editreview', {
            state: { bookId, bookName, author,userId, rating: userReview.rating, review: userReview.review }
        });

    }
    return(
        <>
           <div className="flex-col bg-amber-100 border-2 border-orange-400 w-48 rounded-lg text-left p-2 m-4 list-none">
            <li><span className="font-semibold">Name : </span>{bookName}</li>
            <li><span className="font-semibold">Author : </span>{author}</li>
            <li><span className="font-semibold">Review : </span>{userReview.review} </li>
            <li><span className="font-semibold">Rating : </span>{stars}</li>
            <div className="mt-2"><button onClick={deleteReview} className="mx-4"><FontAwesomeIcon icon={faTrash}/></button><button onClick={editReview}><FontAwesomeIcon icon={faPenToSquare}  /></button></div>
           </div>
        </>
    )
}

export default BookDetails;