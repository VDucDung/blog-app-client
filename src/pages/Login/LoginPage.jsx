import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import MainLayout from 'components/MainLayout'
import { login } from 'services/index/users'
import { userActions } from 'store/reducers/userReducers'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password })
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data?.data?.user))
      toast.success(data?.message)
      localStorage.setItem('user', JSON.stringify(data?.data?.user))
      localStorage.setItem(
        'accessToken',
        JSON.stringify(data?.data?.accessToken)
      )
      localStorage.setItem(
        'refreshToken',
        JSON.stringify(data?.data?.refreshToken)
      )
      navigate('/')
    },
    onError: (error) => {
      toast.error('Email or password is incorrect')
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => {
    const { email, password } = data
    mutate({ email, password })
  }

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-center font-roboto text-2xl font-bold text-dark-hard">
            Login
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="email"
                className="block font-semibold text-[#5a7184]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
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
                placeholder="Enter email"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.email ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="password"
                className="block font-semibold text-[#5a7184]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
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
                placeholder="Enter password"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.password ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Link
              to="/auth/forgot-password"
              className="text-sm font-semibold text-primary"
            >
              Forgot password?
            </Link>
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Sign In
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              Do not have an user?{' '}
              <Link to="/auth/register" className="text-primary">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default LoginPage
