import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/config'
import { Button, Container } from '../components'
import { Link, useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        } else {
          navigate('/')
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.featuredImage)
        navigate('/')
      }
    })
  }

  return post ? (
    <div className="py-12 sm:py-16">
      <Container className='max-w-5xl'>
        <article className='overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 shadow-2xl shadow-cyan-500/10'>
          <div className="relative flex min-h-[280px] justify-center overflow-hidden bg-slate-900 sm:min-h-[420px]">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent' />

            {isAuthor && (
              <div className="absolute right-5 top-5 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-emerald-300" className="mr-0">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-rose-400" textColor='text-white' onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className='p-6 sm:p-10'>
            <p className='mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300'>Featured story</p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">{post.title}</h1>
            <div className="browser-css mt-8 max-w-none text-slate-200">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </div>
  ) : null
}

export default Post
