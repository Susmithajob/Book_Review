import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import  Axios from "axios";

const UpdateInfo =()=>{
    const {userId} = useParams();
    const [newName,setNewName] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const navigate = useNavigate();
    const getData=async ()=>{
        try{
            const response= await Axios.get(`/api/updateinfo/${userId}`);
            const {name,email} = response.data;
            setNewName(name);
            setNewEmail(email);   
        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    const update = async (e) => {
        e.preventDefault();
        console.log(newName)
        try{
            await Axios.post(`/api/updateinfo/${userId}`, {
                name: newName,
                email: newEmail,
                password: newPassword
              })
              alert("Updated successfully.Please Sign in again");
              localStorage.removeItem('userName');
              navigate(`/signin`);

        }
        catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return(
        <>
        <Header />
        <div className="bg-background bg-cover bg-center min-h-screen p-4">

        <h2 className="text-center text-4xl font-bold text-white">Update Details</h2>
        <div className="border-2 border-black p-6 mx-auto w-2/3 md:w-96 sm:w-72 w-min-60 mt-4 rounded-lg bg-amber-50/20">
        <form onSubmit={update}>
            <label className="text-white text-xl">Enter Name</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={newName} type="text" onChange={(e) => { setNewName(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Enter Email</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" value={newEmail} type="email" onChange={(e) => { setNewEmail(e.target.value) }}></input><br></br>
            <label className="text-white text-xl">Enter New Password</label><br></br>
            <input className="w-full border-gray-100 rounded-md bg-amber-100 mt-1 text-lg pl-2" placeholder="new password" type="password" onChange={(e) => { setNewPassword(e.target.value) }}></input><br></br>
                <div className="flex justify-center mt-4">
                        <button className="p-1 border-black border-2 rounded-md bg-white" type="submit">Update</button>
                </div>   
        </form>
        </div>
        </div>
        </>
    );
}
export default UpdateInfo;