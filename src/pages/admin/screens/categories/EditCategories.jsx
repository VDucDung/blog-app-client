import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getSingleCategory, updateCategory } from 'services/index/categories'

const EditCategories = () => {
  const queryClient = useQueryClient()
  const [categoryTitle, setCategoryTitle] = useState('')
  const navigate = useNavigate()
  const { categoryId } = useParams()

  const {
    isLoading,
    isError,
    data: categoryData,
    isSuccess
  } = useQuery({
    queryFn: () => {
      return getSingleCategory({ categoryId })
    },
    queryKey: ['categories', categoryId],
    refetchOnWindowFocus: false
  })
  const { data } = categoryData
  useEffect(() => {
    if (isSuccess) {
      setCategoryTitle(data?.name)
    }
  }, [isSuccess])

  const { mutate: mutateUpdateCategory, isLoading: isLoadingUpdateCategory } =
    useMutation({
      mutationFn: ({ name, categoryId }) => {
        return updateCategory({
          name,
          categoryId
        })
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['categories', categoryId])
        toast.success('Category is updated')
        navigate(`/admin/categories/manage/edit/${data?._id}`, {
          replace: true
        })
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  const handleUpdateCategory = () => {
    if (!categoryTitle) return
    mutateUpdateCategory({
      name: categoryTitle,
      categoryId
    })
  }

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Category</h4>
      <div className="d-form-control w-full mt-6">
        <input
          value={categoryTitle}
          className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          onChange={(e) => setCategoryTitle(e.target.value)}
          placeholder="category title"
        />
        <button
          disabled={isLoadingUpdateCategory || isLoading || isError}
          type="button"
          onClick={handleUpdateCategory}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Category
        </button>
      </div>
    </div>
  )
}

export default EditCategories
