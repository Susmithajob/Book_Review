import  Axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

const SignUpPage = ()=>{

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signUp = async (e) => {
        e.preventDefault();
        try {
        const response = await Axios.post(`${process.env.API_URL}/signup`, {
          name,
          email,
          password
        })
        const {userId,userName}=response.data;
        localStorage.setItem('userName', userName);
        alert('Signup successful');
        navigate(`/userhome/${userId}`);
        } catch (error) {
            console.error(error);
            alert('Signup failed');
        }
      }
    
    return (
        <>
        <Header />
        <div className="bg-background bg-cover bg-center min-h-screen p-4">

        <h2 className="text-center text-4xl font-bold text-white">Sign Up</h2>
        <div className="border-2 border-black p-6 mx-auto w-2/3 md:w-96 sm:w-72 w-min-60 mt-4 rounded-lg bg-amber-50/20">
        <form onSubmit={signUp}>
            <label className="text-white text-xl">Enter Name</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2"placeholder="Name" type="text" onChange={(e) => { setName(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Enter Email</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="Email" type="email" onChange={(e) => { setEmail(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Enter Password</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }}></input><br></br>
                <div className="flex justify-center mt-4">
                        <button className="p-1 border-black border-2 rounded-md bg-white" type="submit">Sign Up</button>
                </div>
            <p className="text-white">Already have an Account??   <span className="text-red-700 font-semibold"><Link to={'/signin'}>Sign In</Link></span> here</p>
        </form>
        </div>
        </div>
        </>
    )
}

export default SignUpPage;