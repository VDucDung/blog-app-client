/* eslint-disable indent */
import { Link } from 'react-router-dom'

import { images } from 'constants'
import MainLayout from 'components/MainLayout'
import { useDataTable } from 'hooks/useDataTable'
import DataTable from 'pages/admin/components/DataTable'
import { deletePost, getPostsByUserId } from 'services/index/posts'
const ManageBlogs = () => {
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
    dataQueryFn: () =>
      getPostsByUserId({
        userId: userState?.userInfo._id,
        searchKeyword,
        page: currentPage,
        limit: 10
      }),
    dataQueryKey: 'posts',
    deleteDataMessage: 'Post is deleted',
    mutateDeleteFn: ({ slug }) => {
      return deletePost({
        postId: slug
      })
    }
  })
  return (
    <MainLayout>
      {data?.data?.data && data?.data?.data.length > 0 ? (
        <DataTable
          pageTitle="Manage Blogs"
          dataListName="Blogs"
          searchInputPlaceHolder="Blog title..."
          searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeyword={searchKeyword}
          tableHeaderTitleList={['Title', 'Category', 'Created At', 'Tags', '']}
          isLoading={isLoading}
          isFetching={isFetching}
          data={data?.data?.data}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          headers={data?.headers}
          userState={userState}
        >
          {data?.data?.data.map((post) => (
            <tr key={post?._id}>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href="/" className="relative block">
                      <img
                        src={post?.image ? post?.image : images.samplePostImage}
                        alt={post.title}
                        className="mx-auto object-cover rounded-lg w-10 aspect-square"
                      />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {post.title}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {post?.categories?.length > 0
                    ? post.categories
                        .slice(0, 3)
                        .map(
                          (category, index) =>
                            `${category.name}${
                              post?.categories.slice(0, 3).length === index + 1
                                ? ''
                                : ', '
                            }`
                        )
                    : 'Uncategorized'}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(post.createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex gap-x-2">
                  {post?.tags?.length > 0
                    ? post.tags.map((tag, index) => (
                        <p key={index}>
                          {tag}
                          {post?.tags?.length - 1 !== index && ','}
                        </p>
                      ))
                    : 'No tags'}
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: post?._id
                    })
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/blog/edit/${post?.slug}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 font-bold text-2xl">
            No posts available.
          </p>
        </div>
      )}
    </MainLayout>
  )
}

export default ManageBlogs
