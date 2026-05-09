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
   <button  onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Logout</button>
  )
}

export default Logoutbtn
