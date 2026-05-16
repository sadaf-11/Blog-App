import { useState } from 'react'
import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import {useForm } from 'react-hook-form'

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit}=useForm();
    const [error,setError]=useState("");

    const login = async (data) => {

    setError("");

    try {
        await authService.login(data);
        const userData = await authService.getCurrentUser();

        if (userData) {
            dispatch(authLogin(userData));
            navigate("/");
        }

    } catch (error) {
        setError(error.message);
    }
}
  return (
     <div className='flex w-full items-center justify-center px-4 py-12 sm:py-16'>
        <div className='mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/85 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur sm:p-10'>
        <div className="mb-6 flex justify-center">
                    <span className="inline-flex rounded-full border border-cyan-300/20 bg-slate-950 px-5 py-3 text-2xl">
                        <Logo width="112px" />
                    </span>
        </div>
        <p className='text-center text-sm font-black uppercase tracking-[0.25em] text-cyan-300'>Welcome back</p>
        <h2 className="mt-3 text-center text-3xl font-black leading-tight text-white">Sign in to your account</h2>
        <p className="mt-3 text-center text-base text-slate-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-bold text-cyan-300 transition-all duration-200 hover:text-cyan-100 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
      {error && <p className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-center text-sm font-semibold text-rose-200">{error}</p>}
      
      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className='space-y-5'>
            <Input 
            label="Email"
            type="email"
            placeholder= "Enter your email"
            {...register("email",{
                required:true,
                validate:{
                    matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                }
            })}
            />
            <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            {...register("password",{
                required:true,
            })}
            />
            <Button 
            type='submit'
            className='w-full'>
                Sign In
            </Button>
        </div>
        </form>
        </div>
    </div>
  )
}


export default Login