import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Editor from 'components/editor/Editor'
import { createPost } from 'services/index/posts'
import { getCategories } from 'services/index/categories'

const NewPost = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [body, setBody] = useState(null)
  const [title, setTitle] = useState('')
  const [caption, setCaption] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [errors, setErrors] = useState({
    photo: false,
    body: false,
    title: false,
    caption: false
  })

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories
  } = useQuery({
    queryFn: () =>
      getCategories({ token: JSON.parse(localStorage.getItem('accessToken')) }),
    queryKey: ['categories']
  })

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
    useMutation({
      mutationFn: ({ newData, token }) => {
        return createPost({
          newData,
          token
        })
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts'])
        toast.success('Post is created')
        navigate(`/admin/posts/manage/edit/${data?.data.slug}`)
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
    if (selectedCategories.length > 0) {
      newData.append('categories', JSON.stringify(selectedCategories))
    }
    mutateCreatePost({
      newData,
      token: JSON.parse(localStorage.getItem('accessToken'))
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

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    setSelectedCategories((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    )
  }

  return (
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
        <div className="mt-4 flex gap-2 flex-wrap">
          {categoriesData?.data?.categories.map((category) => (
            <label key={category._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={category._id}
                onChange={handleCategoryChange}
              />
              <span className="text-primary text-sm font-roboto inline-block md:text-base">
                {category.name}
              </span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
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
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setErrors({ ...errors, title: !e.target.value })
          }}
          className={`w-full mt-4 px-4 py-2 border rounded-lg ${
            errors.title ? 'border-red-500' : ''
          }`}
        />
        <textarea
          placeholder="Caption"
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value)
            setErrors({ ...errors, caption: !e.target.value })
          }}
          className={`w-full mt-4 px-4 py-2 border rounded-lg ${
            errors.caption ? 'border-red-500' : ''
          }`}
        />
        <div className="w-full mt-4 pb-2 border rounded-lg ">
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
            isLoadingCreatePost ||
            !photo ||
            !body ||
            !title ||
            !caption ||
            isLoadingCategories ||
            isErrorCategories
          }
          type="button"
          onClick={handleCreatePost}
          className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 mt-4 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Create Post
        </button>
      </article>
    </section>
  )
}

export default NewPost
