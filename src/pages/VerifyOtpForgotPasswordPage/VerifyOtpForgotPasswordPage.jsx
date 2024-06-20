import { useState } from 'react'
import toast from 'react-hot-toast'
import MainLayout from 'components/MainLayout'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { verifyOtpForgotPassword } from 'services/index/users'

const VerifyOtpForgotPasswordPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(''))
  const navigate = useNavigate()
  const { mutate, isPending } = useMutation({
    mutationFn: ({ tokenForgot, otp }) => {
      return verifyOtpForgotPassword({ tokenForgot, otp })
    },
    onSuccess: (data) => {
      toast.success('Verify OTP successfully')
      localStorage.setItem(
        'tokenVerifyOTP',
        JSON.stringify(data?.data?.tokenVerifyOTP)
      )
      navigate('/auth/reset-password')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const handleChange = (element, index) => {
    const value = element.value
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (index < 5 && value) {
        document.getElementById(`otp${index + 1}`).focus()
      }
    } else if (!value) {
      const newOtp = [...otp]
      newOtp[index] = ''
      setOtp(newOtp)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const tokenForgot = JSON.parse(localStorage.getItem('tokenForgot'))
    mutate({ tokenForgot, otp: otp.join('') })
  }

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-12">
            Verify OTP code
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mb-12">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target, index)}
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-[50px] focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>
            <div className="text-center text-sm text-gray-500 mt-5 ">
              Enter the OTP sent to your email
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}

export default VerifyOtpForgotPasswordPage
