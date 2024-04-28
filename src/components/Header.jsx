import React from 'react'
import { images } from '../constants'

const navItemsInfo = [
  { name: 'Home' },
  { name: 'Articles' },
  { name: 'Pages' },
  { name: 'Pricing' },
  { name: 'Faq' },
]

const NavItem = ({ name }) => {
  return (
    <li className='relative group'>
      <a href="/" className='px-2 py-2'>{name}</a>
      <span className='cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>/</span>
    </li>
  )
}
const Header = () => {
  return <section>
    <header className='container mx-auto px-5 flex justify-between py-4 items-center'>
      <div>
        <img src={images.Logo} alt="logo" />
      </div>
      <div className='flex gap-x-9 items-center'>
        <ul className='flex gap-x-5 font-semibold'>
          {navItemsInfo.map((item, index) => (<NavItem key={index} name={item.name} />))}
        </ul>
        <button className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'>Sign in</button>
      </div>
    </header>
  </section>
}

export default Header
