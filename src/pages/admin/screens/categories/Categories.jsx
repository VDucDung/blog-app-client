import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { useDataTable } from 'hooks/useDataTable'
import {
  createCategory,
  deleteCategory,
  getCategories
} from 'services/index/categories'
import DataTable from '../../components/DataTable'

const Categories = () => {
  const [categoryTitle, seTcategoryTitle] = useState('')
  const { mutate: mutateCreateCategory, isPending: isLoadingCreateCategory } =
    useMutation({
      mutationFn: ({ name }) => {
        return createCategory({
          name
        })
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['categories'])
        toast.success('Category is created')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })
  const {
    userState,
    currentPage,
    searchKeyword,
    data,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryFn: () => getCategories({ searchKeyword, currentPage }),
    dataQueryKey: 'categories',
    deleteDataMessage: 'Category is deleted',
    mutateDeleteFn: ({ slug }) => {
      return deleteCategory({
        categoryId: slug
      })
    }
  })

  const handleCreateCategory = () => {
    mutateCreateCategory({
      name: categoryTitle
    })
  }
  const { data: categoriesData } = data ? data : {}
  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-lg leading-tight">Add New Category</h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={categoryTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
            onChange={(e) => seTcategoryTitle(e.target.value)}
            placeholder="category title"
          />
          <button
            disabled={isLoadingCreateCategory}
            type="button"
            onClick={handleCreateCategory}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <DataTable
          pageTitle=""
          dataListName="Categories"
          searchInputPlaceHolder="Category title..."
          searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeyword={searchKeyword}
          tableHeaderTitleList={['Title', 'Created At', '']}
          isLoading={isLoading}
          isFetching={isFetching}
          data={categoriesData?.categories}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          headers={categoriesData}
          userState={userState}
        >
          {categoriesData?.categories.map((category) => (
            <tr key={category?._id}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {category.name}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(category.createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: category?._id
                    })
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/auth/admin/categories/manage/edit/${category?._id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  )
}

export default Categories
