import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { images } from 'constants'
import { useDataTable } from 'hooks/useDataTable'
import DataTable from '../../components/DataTable'
import {
  deleteComment,
  getAllComments,
  updateComment
} from 'services/index/comments'

const Comments = () => {
  const token = JSON.parse(localStorage.getItem('accessToken'))
  const [checkCache, setCheckCache] = useState('unchecked')
  const {
    userState,
    currentPage,
    searchKeyword,
    data: commentsData,
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
      getAllComments(token, searchKeyword, currentPage, 10, checkCache),
    dataQueryKey: 'comments',
    deleteDataMessage: 'Comment is deleted',
    mutateDeleteFn: ({ slug, token }) => {
      return deleteComment({
        commentId: slug,
        token: token
      })
    }
  })
  const {
    mutate: mutateUpdateCommentCheck,
    isLoading: isLoadingUpdateCommentCheck
  } = useMutation({
    mutationFn: ({ token, check, commentId }) => {
      return updateComment({ token, check, commentId })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['comments'])
      toast.success(
        data?.data?.check ? 'Comment is approved' : 'Comment is not approved'
      )
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return (
    <DataTable
      pageTitle="Manage Comments"
      dataListName="Comments"
      searchInputPlaceHolder="Search Comments..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        'Author',
        'Comment',
        'In Respond to',
        'Created At',
        ''
      ]}
      isFetching={isFetching}
      isLoading={isLoading}
      data={commentsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={commentsData?.headers}
    >
      {commentsData?.data?.data.map((comment) => (
        <tr key={comment?._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      comment?.userId?.avatar
                        ? comment?.userId?.avatar
                        : images.userImage
                    }
                    alt={comment?.userId?.username}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {comment?.userId?.username}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            {comment?.replyOnUser !== null && (
              <p className="text-gray-900 whitespace-no-wrap">
                In reply to{' '}
                <Link
                  to={`/blog/${comment?.post?.slug}/#comment-${comment?._id}`}
                  className="text-blue-500"
                >
                  {comment?.replyOnUser?.username}
                </Link>
              </p>
            )}
            <p className="text-gray-900 whitespace-no-wrap">
              {comment?.comment}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              <Link
                to={`/blog/${comment?.postId?.slug}`}
                className="text-blue-500"
              >
                {comment?.postId?.title}
              </Link>
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(comment.createdAt).toLocaleString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className={`${
                comment?.check
                  ? 'text-yellow-600 hover:text-yellow-900'
                  : 'text-green-600 hover:text-green-900'
              } disabled:opacity-70 disabled:cursor-not-allowed`}
              onClick={() => {
                setCheckCache(`updated-${comment?._id}-${comment?.check}`)
                mutateUpdateCommentCheck({
                  token: token,
                  check: comment?.check ? false : true,
                  commentId: comment?._id
                })
              }}
            >
              {comment?.check ? 'Unapprove' : 'Approve'}
            </button>
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                setCheckCache(`deleted-${comment?._id}`)
                deleteDataHandler({
                  slug: comment?._id,
                  token: token
                })
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  )
}

export default Comments
