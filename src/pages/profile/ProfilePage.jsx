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
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: token })
    },
    queryKey: ['profile'],
  })
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ username, phone, dateOfBirth, gender }) => {
      return updateProfile({
        token: token,
        userData: { username, phone, dateOfBirth, gender },
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
    },
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
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (profileData && !profileIsLoading) {
      reset({
        username: profileData.data.username,
        phone: profileData.data.phone,
        dateOfBirth: profileData.data.dateOfBirth,
        gender: profileData.data.gender,
      })
    }
  }, [profileData, profileIsLoading, reset])

  const submitHandler = (data) => {
    const { username, phone, dateOfBirth, gender } = data
    const formattedDate = new Date(dateOfBirth).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    mutate({ username, phone, dateOfBirth: formattedDate, gender })
  }

  return (
    <MainLayout>
      <section className="container mx-auto flex w-full py-10">
        <div className="mx-auto w-full flex-col lg:flex lg:max-w-6xl lg:flex-row lg:gap-16">
          <ProfilePicture />
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="border-[#c3cad9] px-6 lg:border-x-2 lg:px-12"
            style={{ margin: 'unset' }}
          >
            <div className="my-4 flex w-full flex-col ">
              <label className="block text-lg font-semibold text-dark-hard">Personal information</label>
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="username" className="block font-semibold text-[#5a7184]">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register('username', {
                  minLength: {
                    value: 1,
                    message: 'Username length must be at least 1 character',
                  },
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                })}
                placeholder="Enter username"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.username ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.username?.message && <p className="mt-1 text-xs text-red-500">{errors.username?.message}</p>}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="phone" className="block font-semibold text-[#5a7184]">
                Phone Number
              </label>
              <input
                type="phone"
                id="phone"
                {...register('phone', {
                  pattern: {
                    value: /^[0-9]{3} [0-9]{3} [0-9]{4}$/,
                    message: 'Enter a valid phone number',
                  },
                })}
                placeholder="Enter phone number"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.phone ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.phone?.message && <p className="mt-1 text-xs text-red-500">{errors.phone?.message}</p>}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="dateOfBirth" className="block font-semibold text-[#5a7184]">
                Date of Birth
              </label>
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field }) => (
                  <Flatpickr
                    {...field}
                    options={{
                      dateFormat: 'd/m/Y',
                      disableMobile: true,
                    }}
                    className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.dateOfBirth ? 'border-red-500' : 'border-[#c3cad9]'}`}
                  />
                )}
              />
              {errors.dateOfBirth?.message && (
                <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth?.message}</p>
              )}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="gender" className="block font-semibold text-[#5a7184]">
                Gender
              </label>
              <select
                id="gender"
                {...register('gender')}
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.gender ? 'border-red-500' : 'border-[#c3cad9]'}`}
              >
                <option value="" disabled selected hidden>
                  Choose gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender?.message && <p className="mt-1 text-xs text-red-500">{errors.gender?.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className="mb-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Update
            </button>
          </form>
          <ProfileChangePassword />
        </div>
      </section>
    </MainLayout>
  )
}

export default ProfilePage
