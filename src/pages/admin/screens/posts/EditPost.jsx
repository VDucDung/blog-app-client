import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import CreatableSelect from 'react-select/creatable'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Editor from 'components/editor/Editor'
import ErrorMessage from 'components/ErrorMessage'
import { getCategories } from 'services/index/categories'
import { getSinglePost, updatePost } from 'services/index/posts'
import { categoryToOption, filterCategories } from 'utils/multiSelectTagUtils'
import ArticleDetailSkeleton from 'pages/articleDetail/components/ArticleDetailSkeleton'
import MultiSelectTagDropdown from 'pages/admin/components/header/select-dropdown/MultiSelectTagDropdown'

const promiseOptions = async (inputValue) => {
  const { data: categoriesData } = await getCategories('', 1, 10)

  return filterCategories(inputValue, categoriesData.categories)
}

const EditPost = () => {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [initialPhoto, setInitialPhoto] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [body, setBody] = useState(null)
  const [categories, setCategories] = useState(null)
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState(null)
  const [caption, setCaption] = useState('')
  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug]
  })
  const { data } = postData ? postData : {}
  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail
  } = useMutation({
    mutationFn: ({ updatedData, postId }) => {
      return updatePost({
        updatedData,
        postId
      })
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['blog', slug])
      toast.success('Post is updated')
      navigate(`/admin/posts/manage/edit/${data?.slug}`, { replace: true })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.image)
      setCategories(data?.categories.map((item) => item._id))
      setTitle(data?.title)
      setCaption(data?.caption)
      setTags(data?.tags)
    }
  }, [data, isError, isLoading])
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file)
  }

  const handleUpdatePost = async () => {
    let updatedData = new FormData()

    if (!initialPhoto && photo) {
      updatedData.append('image', photo)
    } else if (initialPhoto && !photo) {
      const urlToObject = async (url) => {
        let response = await fetch(url)
        let blob = await response.blob()
        const file = new File([blob], 'image', { type: blob.type })
        return file
      }
      const picture = await urlToObject(data?.image)
      updatedData.append('image', picture)
    } else if (initialPhoto && photo) {
      updatedData.append('image', photo)
    }
    if (body) {
      updatedData.append('body', JSON.stringify(body))
    }
    if (categories) {
      updatedData.append('categories', JSON.stringify(categories))
    }
    if (title) {
      updatedData.append('title', title)
    }
    if (caption) {
      updatedData.append('caption', caption)
    }
    if (tags) {
      updatedData.append('tags', JSON.stringify(tags))
    }

    mutateUpdatePostDetail({
      updatedData,
      postId: data?._id
    })
  }

  const handleDeleteImage = () => {
    if (window.confirm('Do you want to delete your Post picture?')) {
      setInitialPhoto(null)
      setPhoto(null)
    }
  }
  let isPostDataLoaded = !isLoading && !isError

  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor="postPicture" className="w-full cursor-pointer">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt={data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={data?.image}
                  alt={data?.title}
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
            <button
              type="button"
              onClick={handleDeleteImage}
              className="w-fit bg-red-500 text-sm text-white font-semibold rounded-lg px-2 py-1 mt-5"
            >
              Delete Image
            </button>
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="title">
                <span className="d-label-text">Title</span>
              </label>
              <input
                id="title"
                value={title}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
              />
            </div>
            <div className="d-form-control w-full">
              <label className="d-label" htmlFor="caption">
                <span className="d-label-text">caption</span>
              </label>
              <input
                id="caption"
                value={caption}
                className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
                onChange={(e) => setCaption(e.target.value)}
                placeholder="caption"
              />
            </div>
            <div className="mb-5 mt-2 relative z-50">
              <label className="d-label">
                <span className="d-label-text">categories</span>
              </label>
              {isPostDataLoaded && (
                <MultiSelectTagDropdown
                  loadOptions={promiseOptions}
                  defaultValue={data?.categories.map(categoryToOption)}
                  onChange={(newValue) =>
                    setCategories(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>
            <div className="mb-5 mt-2 relative z-20">
              <label className="d-label">
                <span className="d-label-text">tags</span>
              </label>
              {isPostDataLoaded && (
                <CreatableSelect
                  defaultValue={data?.tags.map((tag) => ({
                    value: tag,
                    label: tag
                  }))}
                  isMulti
                  onChange={(newValue) =>
                    setTags(newValue.map((item) => item.value))
                  }
                />
              )}
            </div>
            <div className="w-full mt-4 pb-2 border rounded-lg">
              {isPostDataLoaded && (
                <Editor
                  content={data?.body}
                  editable={true}
                  onDataChange={(data) => {
                    setBody(data)
                  }}
                />
              )}
            </div>
            <button
              disabled={isLoadingUpdatePostDetail}
              type="button"
              onClick={handleUpdatePost}
              className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update Post
            </button>
          </article>
        </section>
      )}
    </div>
  )
}

export default EditPost
