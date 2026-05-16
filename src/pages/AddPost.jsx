import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-12 sm:py-16'>
      <Container>
        <div className='mb-8 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-500/10'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-cyan-300'>Writer studio</p>
          <h1 className='mt-3 text-4xl font-black tracking-tight text-white'>Create a new post</h1>
          <p className='mt-3 text-slate-300'>Draft and publish a glowing story for your readers.</p>
        </div>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost
