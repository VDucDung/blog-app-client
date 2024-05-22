/* eslint-disable quotes */
import { useEffect } from 'react'
import 'flatpickr/dist/flatpickr.css'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { userActions } from 'store/reducers/userReducers'
import { changePassword, getUserProfile } from 'services/index/users'

const ProfileChangePassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  const userState = useSelector((state) => state.user)
  const token = JSON.parse(localStorage.getItem('accessToken'))
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: token })
    },
    queryKey: ['profile']
  })
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ oldPassword, newPassword }) => {
      return changePassword({
        token: token,
        oldPassword: oldPassword,
        newPassword: newPassword
      })
    },
    onSuccess: ({ data }) => {
      dispatch(userActions.setUserInfo(data))
      queryClient.invalidateQueries(['profile'])
      toast.success('Password is updated')
      reset()
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/')
    }
  }, [navigate, userState.userInfo])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => {
    const { oldPassword, newPassword } = data
    mutate({ oldPassword, newPassword })
  }
  const password = watch('newPassword')
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="px-6 "
      style={{ margin: 'unset' }}
    >
      <div className="my-4 flex w-full flex-col ">
        <label className="block text-lg font-semibold text-dark-hard">
          Change Password
        </label>
      </div>
      <div className="mb-6 flex w-full flex-col">
        <label
          htmlFor="oldPassword"
          className="block font-semibold text-[#5a7184]"
        >
          Old Password
        </label>
        <input
          type="password"
          id="oldPassword"
          {...register('oldPassword', {
            minLength: {
              value: 6,
              message: 'Password length must be at least 6 characters'
            },
            required: {
              value: true,
              message: 'Password is required'
            }
          })}
          placeholder="Enter password"
          className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.oldPassword ? 'border-red-500' : 'border-[#c3cad9]'}`}
        />
        {errors.oldPassword?.message && (
          <p className="mt-1 text-xs text-red-500">
            {errors.oldPassword?.message}
          </p>
        )}
      </div>
      <div className="mb-6 flex w-full flex-col">
        <label
          htmlFor="newPassword"
          className="block font-semibold text-[#5a7184]"
        >
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          {...register('newPassword', {
            minLength: {
              value: 6,
              message: 'New password length must be at least 6 characters'
            },
            required: {
              value: true,
              message: 'New password is required'
            }
          })}
          placeholder="Enter new password"
          className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.newPassword ? 'border-red-500' : 'border-[#c3cad9]'}`}
        />
        {errors.newPassword?.message && (
          <p className="mt-1 text-xs text-red-500">
            {errors.newPassword?.message}
          </p>
        )}
      </div>
      <div className="mb-6 flex w-full flex-col">
        <label
          htmlFor="confirmNewPassword"
          className="block font-semibold text-[#5a7184]"
        >
          Confirm New Password
        </label>
        <input
          type="password"
          id="confirmNewPassword"
          {...register('confirmNewPassword', {
            required: {
              value: true,
              message: 'Confirm new password is required'
            },
            validate: (value) => {
              if (value !== password) {
                return 'Passwords do not match'
              }
            }
          })}
          placeholder="Enter confirm password"
          className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.confirmNewPassword ? 'border-red-500' : 'border-[#c3cad9]'}`}
        />
        {errors.confirmNewPassword?.message && (
          <p className="mt-1 text-xs text-red-500">
            {errors.confirmNewPassword?.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid || profileIsLoading || updateProfileIsLoading}
        className="mb-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        Update
      </button>
    </form>
  )
}

export default ProfileChangePassword
