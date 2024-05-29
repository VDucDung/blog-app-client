import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { HiOutlineCamera } from 'react-icons/hi'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import Editor from 'components/editor/Editor'
import ErrorMessage from 'components/ErrorMessage'
import { getSinglePost, updatePost } from 'services/index/posts'
import ArticleDetailSkeleton from 'pages/articleDetail/components/ArticleDetailSkeleton'

const EditPost = () => {
  const { slug } = useParams()
  const queryClient = useQueryClient()
  const [initialPhoto, setInitialPhoto] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [body, setBody] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug]
  })

  const {
    mutate: mutateUpdatePostDetail,
    isLoading: isLoadingUpdatePostDetail
  } = useMutation({
    mutationFn: ({ updatedData, postId, token }) => {
      return updatePost({
        updatedData,
        postId,
        token
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['blog', slug])
      toast.success('Post is updated')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  useEffect(() => {
    if (!isLoading && !isError) {
      setInitialPhoto(data?.data?.image)
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
      const picture = await urlToObject(data?.data?.image)
      updatedData.append('image', picture)
    } else if (initialPhoto && photo) {
      updatedData.append('image', photo)
    }
    if (body) {
      updatedData.append('body', JSON.stringify(body))
    }
    mutateUpdatePostDetail({
      updatedData,
      postId: data?.data?._id,
      token: JSON.parse(localStorage.getItem('accessToken'))
    })
  }

  const handleDeleteImage = () => {
    if (window.confirm('Do you want to delete your Post picture?')) {
      setInitialPhoto(null)
      setPhoto(null)
    }
  }
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
                  alt={data?.data?.title}
                  className="rounded-xl w-full"
                />
              ) : initialPhoto ? (
                <img
                  src={data?.data?.image}
                  alt={data?.data?.title}
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
              {data?.data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor
                  content={data?.data?.body}
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
