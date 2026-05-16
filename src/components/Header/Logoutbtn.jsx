import React from 'react'
import {logout} from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
function Logoutbtn() {
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        }).catch((error)=>{
            console.log("Logoutbtn :: logoutHandler :: error",error);
        })
    }
  return (
   <button onClick={logoutHandler} className='rounded-full border border-rose-400/30 px-5 py-2 font-semibold text-rose-100 transition duration-200 hover:border-rose-300 hover:bg-rose-400/10 hover:text-white'>Logout</button>
  )
}

export default Logoutbtn
