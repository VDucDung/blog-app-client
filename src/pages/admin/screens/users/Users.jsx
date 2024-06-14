import { useDataTable } from 'hooks/useDataTable'
import { deleteUser, getAllUsers } from 'services/index/users'
import DataTable from '../../components/DataTable'
import { images } from 'constants'

const Users = () => {
  const token = JSON.parse(localStorage.getItem('accessToken'))
  const {
    userState,
    currentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage
  } = useDataTable({
    dataQueryFn: () => getAllUsers(token, searchKeyword, currentPage),
    dataQueryKey: 'users',
    deleteDataMessage: 'User is deleted',
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        userId: slug,
        token
      })
    }
  })
  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        'Name',
        'Email',
        'Created At',
        'is Verified',
        'is Admin',
        ''
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data?.users}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.data}
      userState={userState}
    >
      {usersData?.data?.users.map((user) => (
        <tr key={user._id}>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={user?.avatar ? user?.avatar : images.userImage}
                    alt={user.username}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-gray-900 whitespace-no-wrap">
                  {user.username}
                </p>
              </div>
            </div>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {user.isVerify ? '✅' : '❌'}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
            <p className="text-gray-900 whitespace-no-wrap">
              {user.role === 'admin' ? '✅' : '❌'}
            </p>
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id,
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

export default Users
