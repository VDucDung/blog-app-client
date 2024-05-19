import { toast } from 'react-hot-toast'
import { FaArrowRight } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'

import ArticleCard from 'components/ArticleCard'
import { getAllPosts } from 'services/index/posts'
import ErrorMessage from 'components/ErrorMessage'
import ArticleCardSkeleton from 'components/ArticleCardSkeleton'

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return (
    <section className="container mx-auto flex flex-col px-5 py-10">
      <div className=" flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          ))
        ) : isError ? (
          <ErrorMessage message="Could not fetch the posts data" />
        ) : (
          data?.data.map((post) => (
            <ArticleCard key={post._id} post={post} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
          ))
        )}
      </div>
      <button className="mx-auto flex items-center gap-x-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary">
        <span>More articles</span>
        <FaArrowRight className="h-3 w-3" />
      </button>
    </section>
  )
}

export default Articles
