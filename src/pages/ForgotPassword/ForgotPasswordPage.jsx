import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmail } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'

import MainLayout from 'components/MainLayout'
import { forgotPassword } from 'services/index/users'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ email }) => {
      return forgotPassword({ email })
    },
    onSuccess: (data) => {
      toast.success(data?.message)
      localStorage.setItem(
        'tokenForgot',
        JSON.stringify(data?.data?.tokenForgot)
      )
      navigate('/auth/verify-otp-forgot-password')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: ''
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => {
    const { email } = data
    mutate({ email })
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-2">
            Password Recovery
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Send forgotten password confirmation code via email.
          </p>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex justify-between items-center ">
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
                  placeholder="Enter email address to recovery password"
                  className="outline-none border-none w-full"
                />
                <MdOutlineEmail />
              </div>
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isPending}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-[50px] focus:outline-none focus:shadow-outline mt-8"
            >
              Send authentication code
            </button>
            <div className="text-center text-sm text-gray-500 mt-5 ">
              Have you remembered your password?
              <span className="text-blue-500 ml-1 font-bold">
                <a href="/auth/login">Login</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default ForgotPassword
