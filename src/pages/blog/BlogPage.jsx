import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import MainLayout from '../../components/MainLayout'
import ArticleCard from '../../components/ArticleCard'
import { getAllPosts } from '../../services/index/posts'
import ErrorMessage from '../../components/ErrorMessage'
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton'

let isFirstRun = true

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsValue = Object.fromEntries([...searchParams])

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParamsValue?.page) || 1
  )

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllPosts('', currentPage, 12),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message)
    }
  })

  console.log(data)

  useEffect(() => {
    if (isFirstRun) {
      isFirstRun = false
      return
    }
    window.scrollTo(0, 0)
    refetch()
  }, [currentPage, refetch])

  const handlePageChange = (page) => {
    setCurrentPage(page)

    setSearchParams({ page })
  }

  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10">
        <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : (
            data?.data?.data.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        {!isLoading && (
          <Pagination
            onPageChange={(page) => handlePageChange(page)}
            currentPage={currentPage}
            totalPageCount={JSON.parse(data?.headers?.['x-totalpagecount'])}
          />
        )}
      </section>
    </MainLayout>
  )
}

export default BlogPage
