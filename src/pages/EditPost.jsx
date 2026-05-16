import React, { useState, useEffect } from 'react'
import { Container, PostForm } from '../components'
import databaseService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  return post ? (
    <div className='py-12 sm:py-16'>
      <Container>
        <div className='mb-8 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-violet-500/10'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-violet-300'>Editor mode</p>
          <h1 className='mt-3 text-4xl font-black tracking-tight text-white'>Update your post</h1>
          <p className='mt-3 text-slate-300'>Refine your story and keep your publication polished.</p>
        </div>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost
