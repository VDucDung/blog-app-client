import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import Search from 'components/Search'
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

  const currentPage = parseInt(searchParamsValue?.page) || 1
  const searchKeyword = searchParamsValue?.search || ''
  const {
    data: blogData,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useQuery({
    queryFn: () => getAllPosts(searchKeyword, currentPage, 12),
    queryKey: ['posts'],
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const { data, headers } = blogData ? blogData : {}
  useEffect(() => {
    window.scrollTo(0, 0)
    if (isFirstRun) {
      isFirstRun = false
      return
    }
    window.scrollTo(0, 0)
    refetch()
  }, [currentPage, searchKeyword, refetch])

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword })
  }

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword })
  }
  return (
    <MainLayout>
      <section className="flex flex-col container mx-auto px-5 py-10">
        <Search
          className="w-full max-w-xl mb-10"
          onSearchKeyword={handleSearch}
        />
        <div className=" flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
          {isLoading || isFetching ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton
                key={index}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          ) : isError ? (
            <ErrorMessage message="Couldn't fetch the posts data" />
          ) : data?.data?.length === 0 ? (
            <p className="text-orange-500">No Posts Found!</p>
          ) : (
            data?.data.map((post) => (
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
            totalPageCount={JSON.parse(headers?.['x-totalpagecount'])}
          />
        )}
      </section>
    </MainLayout>
  )
}

export default BlogPage
