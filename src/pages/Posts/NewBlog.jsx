import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCamera } from 'react-icons/hi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Editor from 'components/editor/Editor'
import MainLayout from 'components/MainLayout'
import { createPost } from 'services/index/posts'
import { getCategories } from 'services/index/categories'
import { filterCategories } from 'utils/multiSelectTagUtils'
import MultiSelectTagDropdown from 'pages/admin/components/header/select-dropdown/MultiSelectTagDropdown'

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getCategories('', 1, 10)
  return filterCategories(inputValue, categoriesData.categories)
}
const NewBlog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [body, setBody] = useState(null)
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState(null)
  const [errors, setErrors] = useState({
    photo: false,
    body: false,
    title: false,
    caption: false
  })

  const { mutate: mutateCreatePost, isPending: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ newData }) => {
        return createPost({
          newData
        })
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['blogs'])
        toast.success(data?.message)
        navigate(`/blog/edit/${data?.data.slug}`)
      },
      onError: (error) => {
        toast.error('Có lỗi xảy ra vui lòng thử lại sau')
      }
    })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)
    setErrors({ ...errors, photo: !file })
  }

  const handleCreatePost = async () => {
    let newData = new FormData()
    if (photo) {
      newData.append('image', photo)
    }
    if (body) {
      newData.append('body', JSON.stringify(body))
    }
    if (title) {
      newData.append('title', title)
    }
    if (caption) {
      newData.append('caption', caption)
    }
    if (tags.length > 0) {
      newData.append('tags', JSON.stringify(tags))
    }
    if (categories.length > 0) {
      newData.append('categories', JSON.stringify(categories))
    }
    mutateCreatePost({
      newData
    })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag))
  }
  return (
    <MainLayout>
      <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
        <article className="flex-1">
          <label htmlFor="postPicture" className="w-full cursor-pointer">
            {photo ? (
              <img
                src={URL.createObjectURL(photo)}
                alt="New Post"
                className="rounded-xl w-full"
              />
            ) : (
              <div className="w-full min-h-[200px] bg-blue-50/50 flex justify-center items-center">
                <HiOutlineCamera className="w-7 h-auto text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="postPicture"
            onChange={handleFileChange}
          />
          <div className="d-form-control w-full">
            <label className="d-label" htmlFor="title">
              <span className="d-label-text">Title</span>
            </label>
            <input
              id="title"
              value={title}
              className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              placeholder="title"
            />
          </div>
          <div className="d-form-control w-full">
            <label className="d-label" htmlFor="caption">
              <span className="d-label-text">Caption</span>
            </label>
            <input
              id="caption"
              value={caption}
              className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard "
              onChange={(e) => {
                setCaption(e.target.value)
              }}
              placeholder="caption"
            />
          </div>
          <div className="mb-5 mt-2 ">
            <label className="d-label">
              <span className="d-label-text">Categories</span>
            </label>
            <MultiSelectTagDropdown
              loadOptions={promiseOptions}
              onChange={(newValue) =>
                setCategories(newValue.map((item) => item.value))
              }
            />
          </div>
          <div className="mb-5 mt-2">
            <label className="d-label">
              <span className="d-label-text">Tags</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-primary text-sm font-roboto inline-block md:text-base">
                    {tag}
                  </span>
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tags"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2"
            >
              Add
            </button>
          </div>

          <div className="w-full mt-4 pb-6 border rounded-lg">
            <Editor
              content=""
              editable={true}
              onDataChange={(data) => {
                setBody(data)
                setErrors({ ...errors, body: !data })
              }}
            />
          </div>
          <button
            disabled={
              isLoadingCreatePost || !photo || !body || !title || !caption
            }
            type="button"
            onClick={handleCreatePost}
            className="w-full bg-blue-500 text-white font-semibold rounded-lg px-4 py-3 mt-5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Create Post
          </button>
        </article>
      </section>
    </MainLayout>
  )
}

export default NewBlog
