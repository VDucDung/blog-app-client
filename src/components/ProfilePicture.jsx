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
    setPhoto({ url: URL.createObjectURL(file), file } || null)
    setOpenCrop(true)
  }
  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById('portal')
        )}

      <div
        className="mt-3 gap-x-4 px-6 text-center"
        style={{ margin: 'unset' }}
      >
        <div className="lutline-primary relative mx-auto h-20 w-20 overflow-hidden rounded-full outline outline-1 outline-offset-2">
          <label
            htmlFor="profilePicture"
            className="absolute inset-0 cursor-pointer rounded-full bg-transparent"
          >
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-blue-50/50">
                <HiOutlineCamera className="h-auto w-7 text-primary" />
              </div>
            )}
          </label>
          <input
            type="file"
            className="sr-only"
            id="profilePicture"
            onChange={handleFileChange}
          />
        </div>
        <div className="my-4 flex w-full flex-col">
          <label
            htmlFor="username"
            className="block text-base font-semibold text-dark-hard"
          >
            {user?.username}
          </label>
        </div>
        <div className="my-4 flex w-full flex-col">
          <label
            htmlFor="username"
            className="block text-base font-semibold text-[#5a7184]"
          >
            {user?.email}
          </label>
        </div>
      </div>
    </>
  )
}

export default ProfilePicture
