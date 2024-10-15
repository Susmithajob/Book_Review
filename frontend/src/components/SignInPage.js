import {  useState } from "react";
import  Axios  from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";


const SignInPage =()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
   const navigate = useNavigate();
    const signIn = async (e) => {
        e.preventDefault();
        try{
          const res = await Axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
            email,
            password
          })
          const userName = res.data.user.name;
          const userId = res.data.user._id;
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', userName);
          localStorage.setItem('userId', userId);
          navigate(`/userhome/${userId}`);

        }catch (error) {
          console.error(error);
          alert('Signin failed');
      
      }}
    
   
    return (
      <>
      <Header />
      <div className="bg-background bg-cover bg-center min-h-screen p-4">

      <h2 className="text-center text-4xl font-bold text-white">Sign In</h2>
      <div className="border-2 border-black p-6 mx-auto w-2/3 md:w-96 sm:w-72 w-min-60 mt-4 rounded-lg bg-amber-50/20">
      <form onSubmit={signIn}>
          <label className="text-white text-xl">Enter Email</label><br></br>
          <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2"placeholder="Email" type="email" onChange={(e) => { setEmail(e.target.value) }}></input><br></br>
          <label className="text-white text-xl">Enter Password</label><br></br>
          <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }}></input><br></br>
              <div className="flex justify-center mt-4">
                      <button className="p-1 border-black border-2 rounded-md bg-white" type="submit">Submit</button>
              </div>
              <p className="text-white">Doesnot have an Account??   <span className="text-red-700 font-semibold"><Link to={'/signup'}>Sign Up</Link></span> here</p>
      </form>
      </div>
      </div>
      </>
  )
}
export default SignInPage;