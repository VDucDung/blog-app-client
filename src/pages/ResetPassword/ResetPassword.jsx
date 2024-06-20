import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaLock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import MainLayout from 'components/MainLayout'
import { resetPassword } from 'services/index/users'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: ({ tokenVerifyOTP, newPassword }) => {
      return resetPassword({ tokenVerifyOTP, newPassword })
    },
    onSuccess: (data) => {
      toast.success('Reset password successfully')
      navigate('/auth/login')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Password and confirm password does not match')
    } else {
      const tokenVerifyOTP = JSON.parse(localStorage.getItem('tokenVerifyOTP'))
      mutate({ tokenVerifyOTP: tokenVerifyOTP, newPassword: password })
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-2">
            Reset Password
          </h2>
          <p className="text-center text-sm text-gray-500 mb-8">
            Please enter your new password in the box below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <div className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex justify-between items-center">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-none outline-none"
                  placeholder="Enter new password"
                  required
                />
                <FaLock />
              </div>
            </div>
            <div className="mb-12">
              <div className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 flex justify-between items-center">
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-none outline-none"
                  placeholder="Enter new password again"
                  required
                />
                <FaLock />
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-[50px] focus:outline-none focus:shadow-outline"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default ResetPassword
