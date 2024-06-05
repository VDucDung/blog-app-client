import { images } from 'constants'
import { useDataTable } from 'hooks/useDataTable'
import DataTable from '../../components/DataTable'
import { deleteComment, getAllComments } from 'services/index/comments'

const Comments = () => {
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
      getAllComments(
        JSON.parse(localStorage.getItem('accessToken')),
        searchKeyword,
        currentPage
      ),
    dataQueryKey: 'comments',
    deleteDataMessage: 'Comment is deleted',
    mutateDeleteFn: ({ commentId, token }) => {
      return deleteComment({
        commentId,
        token
      })
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
      data={commentsData?.data?.data}
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
            <p className="text-gray-900 whitespace-no-wrap">
              {comment?.comment}
            </p>
          </td>
        </tr>
      ))}
    </DataTable>
  )
}

export default Comments
