import React from 'react'
import databaseService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className='group block h-full'>
      <article className='flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/40 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-cyan-500/20'>
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-slate-800'>
          <img
            src={databaseService.getFilePreview(featuredImage)}
            alt={title}
            className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-transparent' />
         
        </div>
        <div className='flex flex-1 flex-col p-5'>
          <h2 className='line-clamp-2 text-xl font-black leading-snug text-white transition group-hover:text-cyan-200'>
            {title}
          </h2>
          <p className='mt-4 text-sm font-semibold text-slate-400 transition group-hover:text-violet-200'>
            Read article -&gt;
          </p>
        </div>
      </article>
    </Link>
  )
}

export default PostCard
