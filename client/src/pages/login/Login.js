import React, { useContext, useState } from 'react'
import "./Login.css"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username:undefined,
        passsword:undefined
    });
   const {user,loading,error,dispatch} = useContext(AuthContext);

   const handleChange = (e)=>{
   
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
   }

   const handleLogin = async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    let res;
    try{
             res = await axios.post("/auth/login",credentials);   
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            navigate("/")
    } catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
    }
   }
   

  return (
    <div className="login">
        <div className="lContainer">
           <input type="text" placeholder='username' id="username" onChange={handleChange} className='lInput'/>
           <input type="password" placeholder='password' id="password" onChange={handleChange} className='lInput'/>
           <button disabled={loading} className='lLogin' onClick={handleLogin}>Login</button>
           {error && 
                <span>{error.message}</span>
           }
        </div>
    
    </div>
  )
}

export default Login