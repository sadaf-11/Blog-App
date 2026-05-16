import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import databaseService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {
  const { register, handleSubmit, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      featuredImage: post?.featuredImage || '',
      status: post?.status || 'active',
    },
  })

  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null

      if (file) {
        databaseService.deleteFile(post.featuredImage)
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = await databaseService.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+$/g, '')
    }

    return ''
  }, [])

  const titleRegistration = register('title', { required: true })

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 sm:p-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="space-y-5">
        <Input
          label="Title"
          placeholder="A glowing post title"
          className="mb-4"
          {...titleRegistration}
          onChange={(e) => {
            titleRegistration.onChange(e)
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <Input
          label="Slug"
          placeholder="post-url-slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }}
        />
        <div className='overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60 p-3'>
          <RTE label="Content" name="content" control={control} defaultValue={getValues('content')} />
        </div>
      </div>
      <aside className="space-y-5 rounded-3xl border border-cyan-300/10 bg-slate-950/50 p-5">
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && (
          <div className="w-full overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 p-2">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-2xl object-cover"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <div className='rounded-3xl border border-violet-300/20 bg-violet-400/10 p-5 text-sm leading-6 text-violet-100'>
          Add a strong image and clear title to make your story stand out in the dark card grid.
        </div>
        <Button type="submit" bgColor={post ? 'bg-emerald-300' : undefined} className="w-full">
          {post ? 'Update Post' : 'Publish Post'}
        </Button>
      </aside>
    </form>
  )
}
