import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import { useState, useEffect } from 'react'
import { generateHTML } from '@tiptap/html'
import Italic from '@tiptap/extension-italic'
import { useQuery } from '@tanstack/react-query'
import Document from '@tiptap/extension-document'
import { Link, useParams } from 'react-router-dom'
import Paragraph from '@tiptap/extension-paragraph'

import { images } from 'constants'
import MainLayout from 'components/MainLayout'
import BreadCrumbs from 'components/BreadCrumbs'
import { getAllPosts, getSinglePost } from 'services/index/posts'
import SuggestedPosts from './container/SuggestedPosts'
import ErrorMessage from 'components/ErrorMessage'
import SocialShareButtons from 'components/SocialShareButtons'
import CommentsContainer from 'components/comments/CommentsContainer'
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton'

const ArticleDetailPage = () => {
  const { id: slug } = useParams()
  const userState = useSelector((state) => state.user)
  const [breadCrumbsData, setbreadCrumbsData] = useState([])
  const [body, setBody] = useState(null)

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug],
    onSuccess: (data) => {
      if (data?.data?.body) {
        setbreadCrumbsData([
          { name: 'Home', link: '/' },
          { name: 'Blog', link: '/blog' },
          { name: 'Article title', link: `/blog/${data?.data.slug}` },
        ])
      }
    },
  })

  useEffect(() => {
    if (data?.data?.body) {
      setBody(parse(generateHTML(data.data.body, [Bold, Italic, Text, Paragraph, Document])))
    }
  }, [data])

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts'],
  })

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
              src={data?.data?.photo ? data?.data?.photo : images.samplePostImage}
              alt={data?.data?.title}
            />
            <div className="mt-4 flex gap-2">
              {data?.data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/blog?category=${category.name}`}
                  className="inline-block font-roboto text-sm text-primary md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="mt-4 font-roboto text-xl font-medium text-dark-hard md:text-[26px]">{data?.data?.title}</h1>
            <div className="prose prose-sm mt-4 sm:prose-base">{body}</div>
            <CommentsContainer
              comments={data?.data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="Latest Article"
              posts={postsData?.data}
              tags={data?.data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="mb-4 font-roboto font-medium text-dark-hard md:text-xl">Share on:</h2>
              <SocialShareButtons url={encodeURI(window.location.href)} title={encodeURIComponent(data?.data?.title)} />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  )
}

export default ArticleDetailPage
