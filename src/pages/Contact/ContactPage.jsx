import toast from 'react-hot-toast'
import { CiUser } from 'react-icons/ci'
import { useForm } from 'react-hook-form'
import { IoIosSend } from 'react-icons/io'
import { FaPhoneVolume } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { useMutation } from '@tanstack/react-query'

import MainLayout from 'components/MainLayout'
import { createContact } from 'services/index/contacts'
const ContactPage = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ username, email, phone, message }) => {
      return createContact({ username, email, phone, message })
    },
    onSuccess: (data) => {
      toast.success(data?.message)
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
      username: '',
      email: '',
      phone: '',
      message: ''
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => {
    const { username, email, phone, message } = data
    mutate({ username, email, phone, message })
  }
  return (
    <MainLayout>
      <div className="container text-center flex flex-col items-center mt-24 mb-24 border-gray-300 rounded-md shadow-sm mx-auto">
        <h4 className="text-3xl font-bold">Get in touch with us</h4>
        <p className="text-sm text-gray-500 mt-2 max-w-xl">
          Do you have suggestions or feedback? We are eager to hear from you!
          Please use the form below to share your thoughts. Thank you for
          helping us improve!
        </p>
        <form className="form w-[75%]" onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4 mt-12 text-left">
            <div className="">
              <label htmlFor="username" className="text-sm font-bold">
                Username <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  {...register('username', {
                    required: {
                      value: true,
                      message: 'Username is required'
                    }
                  })}
                  placeholder="Enter your username"
                  className="border-gray-600 rounded-md shadow-sm mt-1 block w-full px-4 py-3 outline-none"
                />
                <CiUser className="absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="text-sm font-bold">
                Email <span className="text-red-600">*</span>
              </label>
              <div
                className={`relative ${errors.email ? 'border-red-600' : ''}`}
              >
                <input
                  id="email"
                  type="email"
                  name="email"
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
                  placeholder="Enter your email"
                  className="border-gray-600 rounded-md shadow-sm mt-1 block w-full px-4 py-3 outline-none"
                />
                <MdOutlineEmail
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${errors.email && 'text-red-600'}`}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="phone" className="text-sm font-bold">
                Phone
              </label>
              <div
                className={`relative ${errors.phone?.message ? 'border-red-600' : ''}`}
              >
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone"
                  className="border-gray-600 rounded-md shadow-sm mt-1 block w-full px-4 py-3 outline-none"
                />
                <FaPhoneVolume
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${errors.phone && 'text-red-600'}`}
                />
              </div>
            </div>
          </div>
          <div className="text-left mt-12">
            <label htmlFor="message" className="text-sm font-bold">
              Content <span className="text-red-600">*</span>
            </label>
            <div
              className={`relative ${errors.message?.message ? 'border-red-600' : ''}`}
            >
              <textarea
                id="message"
                name="message"
                {...register('message', {
                  required: {
                    value: true,
                    message: 'Message is required'
                  }
                })}
                placeholder="Enter your message"
                className="border-gray-600 rounded-md shadow-sm mt-1 block w-full px-4 py-3 outline-none min-h-24"
              ></textarea>
            </div>
          </div>
          <div className="mt-12">
            <button
              disabled={!isValid || isPending}
              type="submit"
              className="flex flex-row justify-center items-center my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              <p className="mr-2">Send</p>
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  )
}

export default ContactPage
