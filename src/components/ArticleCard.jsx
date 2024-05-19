import { Link } from 'react-router-dom'
import { BsCheckLg } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

import { images } from 'constants'

const ArticleCard = ({ post, className }) => {
  return (
    <div className={`overflow-hidden rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}>
      <Link to={`/blog/${post.slug}`}>
        <img
          src={post.photo ? post.photo : images.samplePostImage}
          alt="title"
          className="h-auto w-full object-cover object-center md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto text-xl font-bold text-dark-soft md:text-2xl lg:text-[28px]">{post.title}</h2>
          <p className="mt-3 text-sm text-dark-light md:text-lg">{post.caption}</p>
        </Link>
        <div className="mt-6 flex flex-nowrap items-center justify-between">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <img
              src={post.userId.avatar ? post.userId.avatar : images.userImage}
              alt="post profile"
              className="h-9 w-9 rounded-full md:h-10 md:w-10"
            />
            <div className="flex flex-col">
              <h4 className="text-sm font-bold italic text-dark-soft md:text-base">{post.userId.username}</h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`${post.userId.isVerify ? 'bg-[#36B37E]' : 'bg-red-500'} w-fit rounded-full bg-opacity-20 p-1.5`}
                >
                  {post.userId.isVerify ? (
                    <BsCheckLg className="h-1.5 w-1.5 text-[#36B37E]" />
                  ) : (
                    <AiOutlineClose className="h-1.5 w-1.5 text-red-500" />
                  )}
                </span>
                <span className="text-xs italic text-dark-light md:text-sm">
                  {post.userId.isVerify ? 'Verified' : 'Unverified'} writer
                </span>
              </div>
            </div>
          </div>
          <span className="text-sm font-bold italic text-dark-light md:text-base">
            {new Date(post.createdAt).getDate()}{' '}
            {new Date(post.createdAt).toLocaleString('default', {
              month: 'long',
            })}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
