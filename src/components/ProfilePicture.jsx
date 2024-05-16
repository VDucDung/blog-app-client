import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { HiOutlineCamera } from 'react-icons/hi'

import CropEasy from './crop/CropEasy'
const ProfilePicture = () => {
  const [openCrop, setOpenCrop] = useState(false)
  const [photo, setPhoto] = useState(null)
  const userState = useSelector((state) => state.user)
  const user = userState.userInfo
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto({ url: URL.createObjectURL(file), file })
    setOpenCrop(true)
  }
  return (
    <>
      {openCrop &&
        createPortal(<CropEasy photo={photo} setOpenCrop={setOpenCrop} />, document.getElementById('portal'))}

      <div className='gap-x-4 mt-3 text-center px-6' style={{ margin: 'unset' }}>
        <div className='relative w-20 h-20 mx-auto rounded-full outline outline-offset-2 outline-1 lutline-primary overflow-hidden'>
          <label
            htmlFor='profilePicture'
            className='cursor-pointer absolute inset-0 rounded-full bg-transparent'
          >
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt='profile'
                className='w-full h-full object-cover'
              />
            ) : (
              <div className='w-full h-full bg-blue-50/50 flex justify-center items-center'>
                <HiOutlineCamera className='w-7 h-auto text-primary' />
              </div>
            )}
          </label>
          <input type='file' className='sr-only' id='profilePicture' onChange={handleFileChange} />
        </div>
        <div className='flex flex-col my-4 w-full'>
          <label
            htmlFor='username'
            className='text-dark-hard font-semibold block text-base'
          >
            {user?.username}
          </label>
        </div>
        <div className='flex flex-col my-4 w-full'>
          <label
            htmlFor='username'
            className='text-[#5a7184] font-semibold block text-base'
          >
            {user?.email}
          </label>
        </div>
      </div>
    </>
  )
}

export default ProfilePicture
