import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header =()=>{
    const navigate = useNavigate();
    const [loggedInUser,setLoggedInUser] = useState('Guest');
    const [logButton,setLogButton] = useState('Login')
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
       
        if (storedUserName) {
          setLoggedInUser(storedUserName);
          setLogButton('Logout');
        }
      }, []);
    
      const handleLogin = () => {
        if (logButton === 'Login') {
          navigate('/signin');
        } else {
          setLogButton('Login');
          localStorage.removeItem('userName');
          setLoggedInUser('Guest');
          navigate('/');
        }
      };

      
        const handleHomeNavigation = () => {
          const storedUserId = localStorage.getItem('userId');
          if (logButton === 'Logout') {
            navigate(`/userhome/${storedUserId}`); 
          } else {
            navigate('/'); 
          }
        };
      
    
    return(
        <>
            <div className="w-full bg-amber-500 h-20 flex flex-wrap justify-between p-4 my-auto overflow-hidden ">
                <h4 className="text-2xl md:text-4xl">Know Books</h4>
                <div className="flex w-1/4 sm:w-32 md:w-48 justify-evenly">
                <button className="bg-yellow-700 text-black text-sm font-semibold rounded-sm px-2 mr-2 hover:bg-gray-200" onClick={handleHomeNavigation}>Home </button>
                <button className="bg-yellow-700 text-black text-sm font-semibold rounded-sm px-2 mr-2">{loggedInUser}</button>
                <button className="bg-yellow-700 text-black text-sm font-semibold rounded-sm px-2 mr-2 hover:bg-gray-200" onClick={handleLogin}>{logButton}</button>
                </div>
            </div>
        </>

    )
}

export default Header;
