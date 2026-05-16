import React, { useState, useEffect } from 'react'
import databaseService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.rows)
      }
    })
  }, [])

  return (
    <div className='w-full py-12 sm:py-16'>
      <Container>
        <div className='mb-10 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-500/10'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-cyan-300'>Library</p>
          <h1 className='mt-3 text-4xl font-black tracking-tight text-white'>All Posts</h1>
          <p className='mt-3 max-w-2xl text-slate-300'>Explore a growing collection of blogs written to inform and inspire.</p>
        </div>
        {posts.length > 0 ? (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <div className='rounded-[2rem] border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center text-slate-300'>
            No posts found yet.
          </div>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
