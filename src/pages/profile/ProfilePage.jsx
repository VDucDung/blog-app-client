/* eslint-disable quotes */
import { useEffect } from 'react'
import 'flatpickr/dist/flatpickr.css'
import { toast } from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import MainLayout from 'components/MainLayout'
import ProfilePicture from 'components/ProfilePicture'
import { userActions } from 'store/reducers/userReducers'
import { getUserProfile, updateProfile } from 'services/index/users'
import ProfileChangePassword from 'components/ProfileChangePassword'

const ProfilePage = () => {
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
    mutationFn: ({ username, phone, dateOfBirth, gender }) => {
      return updateProfile({
        token: token,
        userData: { username, phone, dateOfBirth, gender }
      })
    },
    onSuccess: ({ data }) => {
      dispatch(userActions.setUserInfo(data))
      localStorage.setItem('user', JSON.stringify(data))
      queryClient.invalidateQueries(['profile'])
      toast.success('Profile is updated')
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
    control,
    formState: { errors, isValid },
    reset
  } = useForm({
    defaultValues: {
      username: '',
      phone: '',
      dateOfBirth: '',
      gender: ''
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (profileData && !profileIsLoading) {
      reset({
        username: profileData.data.username,
        phone: profileData.data.phone,
        dateOfBirth: profileData.data.dateOfBirth,
        gender: profileData.data.gender
      })
    }
  }, [profileData, profileIsLoading, reset])

  const submitHandler = (data) => {
    const { username, phone, dateOfBirth, gender } = data
    const formattedDate = new Date(dateOfBirth).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    mutate({ username, phone, dateOfBirth: formattedDate, gender })
  }

  return (
    <MainLayout>
      <section className='container w-full mx-auto py-10 flex'>
        <div className='lg:flex lg:flex-row lg:gap-16 lg:max-w-6xl w-full mx-auto flex-col'>
          <ProfilePicture />
          <form onSubmit={handleSubmit(submitHandler)} className='lg:border-x-2 border-[#c3cad9] lg:px-12 px-6' style={{ margin: 'unset' }}>
            <div className='flex flex-col my-4 w-full '>
              <label
                className='text-dark-hard font-semibold block text-lg'
              >
                Personal information
              </label>
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='username'
                className='text-[#5a7184] font-semibold block'
              >
                Username
              </label>
              <input
                type='text'
                id='username'
                {...register('username', {
                  minLength: {
                    value: 1,
                    message: 'Username length must be at least 1 character'
                  },
                  required: {
                    value: true,
                    message: 'Username is required'
                  }
                })}
                placeholder='Enter username'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.username ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.username?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='phone'
                className='text-[#5a7184] font-semibold block'
              >
                Phone Number
              </label>
              <input
                type='phone'
                id='phone'
                {...register('phone', {
                  pattern: {
                    value: /^[0-9]{3} [0-9]{3} [0-9]{4}$/,
                    message: 'Enter a valid phone number'
                  }
                })}
                placeholder='Enter phone number'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.phone ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.phone?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.phone?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='dateOfBirth'
                className='text-[#5a7184] font-semibold block'
              >
                Date of Birth
              </label>
              <Controller
                control={control}
                name='dateOfBirth'
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    options={{
                      dateFormat: 'm /d/Y',
                      disableMobile: true
                    }}
                    className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.dateOfBirth ? 'border-red-500' : 'border-[#c3cad9]'}`}
                  />
                )}
              />
              {errors.dateOfBirth?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.dateOfBirth?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='gender'
                className='text-[#5a7184] font-semibold block'
              >
                Gender
              </label>
              <select
                id='gender'
                {...register('gender')}
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.gender ? 'border-red-500' : 'border-[#c3cad9]'}`}
              >
                <option value='' disabled selected hidden>Choose gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.gender?.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              Update
            </button>
          </form>
          <ProfileChangePassword />
        </div>
      </section >
    </MainLayout >
  )
}

export default ProfilePage
