import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    databaseService.getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.rows)
        }
      })
      .catch((error) => {
        console.log('HOME ERROR:', error)
      })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/70 p-8 text-center shadow-2xl shadow-cyan-500/10 sm:p-14">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
    Your blogging space
</p>

<h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
    Discover stories worth reading.
</h1>

<p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
    Sign in to explore thoughtful articles, publish your own posts, and keep track of your writing.
</p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/login" className="rounded-full bg-cyan-300 px-7 py-3 font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-200">
                Login to read posts
              </Link>
              <Link to="/signup" className="rounded-full border border-violet-300/40 px-7 py-3 font-bold text-violet-100 transition hover:border-violet-200 hover:bg-violet-400/10">
                Create account
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-12 sm:py-16'>
      <Container>
        <section className='mb-12 overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-violet-500/10 sm:p-12'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-cyan-300'>Featured stories</p>
          <div className='mt-4 grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end'>
            <div>
              <h1 className='text-4xl font-black tracking-tight text-white sm:text-6xl'>Discover stories worth reading.</h1>
              <p className='mt-5 max-w-2xl text-lg leading-8 text-slate-300'>A place to share thoughts, explore ideas, and read stories that matter.</p>
            </div>
            <div className='rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-cyan-50'>
              <span className='text-4xl font-black'>{posts.length}</span>
              <p className='mt-1 text-sm font-semibold uppercase tracking-widest text-cyan-200'>published posts</p>
            </div>
          </div>
        </section>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
