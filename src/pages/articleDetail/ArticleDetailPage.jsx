import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

import { images } from 'constants'
import Editor from 'components/editor/Editor'
import MainLayout from 'components/MainLayout'
import BreadCrumbs from 'components/BreadCrumbs'
import ErrorMessage from 'components/ErrorMessage'
import parseJsonToHtml from 'utils/parseJsonToHtml'
import SuggestedPosts from './container/SuggestedPosts'
import SocialShareButtons from 'components/SocialShareButtons'
import { getAllPosts, getSinglePost } from 'services/index/posts'
import CommentsContainer from 'components/comments/CommentsContainer'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'

const ArticleDetailPage = () => {
  const { id: slug } = useParams()
  const userState = useSelector((state) => state.user)
  const [breadCrumbsData, setbreadCrumbsData] = useState([])
  const [body, setBody] = useState(null)

  const {
    data: postData,
    isLoading,
    isError
  } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: 'Home', link: '/' },
        { name: 'Blog', link: '/blog' },
        { name: 'Article title', link: `/blog/${data?.slug}` }
      ])
      setBody(parseJsonToHtml(data?.body))
    }
  })
  const { data } = postData ? postData : {}
  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts']
  })
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Could not fetch the post detail" />
      ) : (
        <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="w-full rounded-xl"
              src={data?.image ? data?.image : images.samplePostImage}
              alt={data?.title}
            />
            <div className="mt-4 flex gap-2">
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="inline-block font-roboto text-sm text-primary md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="w-full">
              {!isLoading && !isError && (
                <Editor content={data?.body} editable={false} />
              )}
            </div>
            <CommentsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData?.data}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="mb-4 font-roboto font-medium text-dark-hard md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}

export default ArticleDetailPage
