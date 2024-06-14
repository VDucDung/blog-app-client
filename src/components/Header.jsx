import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

import { images } from 'constants'
import { logout } from 'store/actions/user'

const navItemsInfo = [
  { name: 'Home', type: 'link' },
  { name: 'Blog', type: 'link', href: '/blog' },
  { name: 'Pages', type: 'dropdown', items: ['About us', 'Contact us'] },
  { name: 'Pricing', type: 'link' },
  { name: 'Faq', type: 'link' }
]

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState
    })
  }

  return (
    <li className="group relative">
      {item.type === 'link' ? (
        <>
          <a href={item.href} className="px-4 py-2">
            {item.name}
          </a>
          <span className="absolute right-0 top-0 cursor-pointer font-bold text-blue-500 opacity-0 transition-all duration-500 group-hover:right-[90%] group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center gap-x-1 px-4 py-2"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${dropdown ? 'block' : 'hidden'} w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
          >
            <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-transparent">
              {item.items.map((page, index) => (
                <a
                  key={index}
                  href="/"
                  className="px-4 py-2 text-white hover:bg-dark-light hover:text-white lg:text-dark-soft"
                >
                  {page}
                </a>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [navIsVisible, setNavIsVisible] = useState(false)
  const userState = useSelector((state) => state.user)
  const [profileDrowpdown, setProfileDrowpdown] = useState(false)

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState
    })
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <section className="sticky left-0 right-0 top-0 z-50 bg-white">
      <header className="container mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/">
          <img src={images.Logo} alt="logo" className="w-8" />
        </Link>
        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="h-6 w-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="h-6 w-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${navIsVisible ? 'right-0' : '-right-full'} fixed bottom-0 top-0 z-[49] mt-[56px] flex w-full flex-col items-center justify-center gap-x-9 bg-dark-hard transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row lg:justify-end lg:bg-transparent`}
        >
          <ul className="flex flex-col items-center gap-x-2 gap-y-5 font-semibold text-white lg:flex-row lg:text-dark-soft">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="flex flex-col items-center gap-x-2 gap-y-5 font-semibold text-white lg:flex-row lg:text-dark-soft">
              <div className="group relative">
                <div className="flex flex-col items-center">
                  <button
                    className="mt-5 flex items-center gap-x-1 rounded-full border-2 border-blue-500 px-6 py-2 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white lg:mt-0"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${profileDrowpdown ? 'block' : 'hidden'} w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
                  >
                    <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-transparent">
                      {userState?.userInfo?.role === 'admin' && (
                        <button
                          onClick={() => navigate('/admin')}
                          type="button"
                          className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => navigate('/profile')}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="mt-5 rounded-full border-2 border-blue-500 px-6 py-2 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white lg:mt-0"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  )
}

export default Header
