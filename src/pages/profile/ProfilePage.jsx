import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'

import MainLayout from 'components/MainLayout'
import { getUserProfile } from 'services/index/users'
import ProfilePicture from 'components/ProfilePicture'

const ProfilePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.data.accessToken })
    },
    queryKey: ['profile']
  })

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/')
    }
  }, [navigate, userState.userInfo])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    values: {
      username: profileIsLoading ? '' : profileData.username,
      email: profileIsLoading ? '' : profileData.email
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => { }

  console.log(profileData.data)

  return (
    <MainLayout>
      <section className='container mx-auto px-5 py-10'>
        <div className='w-full max-w-sm mx-auto'>
          <ProfilePicture avatar={profileData?.data.avatar} />
          <form onSubmit={handleSubmit(submitHandler)}>
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
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.name ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.username?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='email'
                className='text-[#5a7184] font-semibold block'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,:\s@']+(\.[^<>()[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email'
                  },
                  required: {
                    value: true,
                    message: 'Email is required'
                  }
                })}
                placeholder='Enter email'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.email ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.email?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className='flex flex-col mb-6 w-full'>
              <label
                htmlFor='password'
                className='text-[#5a7184] font-semibold block'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password length must be at least 6 characters'
                  }
                })}
                placeholder='Enter password'
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${errors.password ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.password?.message && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.password?.message}
                </p>
              )}
            </div>
            <button
              type='submit'
              disabled={!isValid || profileIsLoading}
              className='bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed'
            >
              Register
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default ProfilePage
