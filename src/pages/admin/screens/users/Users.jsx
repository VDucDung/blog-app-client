import { useDataTable } from 'hooks/useDataTable'
import {
  deleteUser,
  getAllUsers,
  updateProfile,
  updateUser
} from 'services/index/users'
import DataTable from '../../components/DataTable'
import { images } from 'constants'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'

const Users = () => {
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
    dataQueryFn: () => getAllUsers(searchKeyword, currentPage),
    dataQueryKey: 'users',
    deleteDataMessage: 'User is deleted',
    mutateDeleteFn: ({ slug }) => {
      return deleteUser({
        userId: slug
      })
    }
  })

  const { mutate: mutateUpdateUser, isPending: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ isAdmin, userId }) => {
        return updateUser({
          userId: userId,
          userData: { role: isAdmin }
        })
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['users'])
        toast.success('User is updated')
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

  const handleAdminCheck = (event, userId) => {
    const initialCheckValue = !event.target.checked

    if (
      window.confirm('Do you want to change the admin status of this user?')
    ) {
      mutateUpdateUser({
        userId,
        isAdmin: event.target.checked ? 'admin' : 'user'
      })
    } else {
      event.target.checked = initialCheckValue
    }
  }
  const { data: usersData } = data ? data : {}
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
      data={usersData?.users}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData}
      userState={userState}
    >
      {usersData?.users.map((user) => (
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
            <input
              type="checkbox"
              className="d-checkbox disabled:bg-orange-400 disabled:opacity-100 checked:bg-[url('../public/images/check.png')] bg-cover checked:disabled:bg-none"
              defaultChecked={user.role === 'admin'}
              onChange={(event) => handleAdminCheck(event, user._id)}
              disabled={isLoadingUpdateUser}
            />
          </td>
          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id
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
