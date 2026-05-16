import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100'>
      <div className='pointer-events-none fixed inset-0 -z-10'>
        <div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl' />
        <div className='absolute right-0 top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl' />
        <div className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl' />
      </div>
      <div className='flex min-h-screen flex-col'>
        <Header />
        <main className='flex-1'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='flex min-h-screen items-center justify-center bg-slate-950 text-cyan-200'>
      <div className='rounded-3xl border border-cyan-400/20 bg-slate-900/80 px-8 py-5 shadow-2xl shadow-cyan-500/10'>Loading your blog...</div>
    </div>
  )
}

export default App
