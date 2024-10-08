import { Link } from "react-router-dom";
import Header from "./Header";


const Homepage =()=>{
  
    return (
        <>
        <Header />
        
        <div className="bg-background bg-cover bg-center min-h-screen flex flex-col items-center justify-center text-center py-5">
          <h2 className="text-8xl text-white font-bold font-sans drop-shadow-xl my-5 italic">Know More About Books</h2>
          <p className="text-3xl text-white font-semibold my-10"><Link to={'/signup'}>Share Your reviews by Signing Up!!</Link></p>
          <Link to={'/viewreview'}><p className="text-3xl text-white font-semibold my-10">View All Reviews</p></Link> 
        </div>
        </>
      );
}

export default Homepage;