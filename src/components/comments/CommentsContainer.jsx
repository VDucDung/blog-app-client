import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'

import Comment from './Comment'
import CommentForm from './CommentForm'
import { createNewComment } from 'services/index/comments'

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug
}) => {
  const userState = useSelector((state) => state.user)
  const [affectedComment, setAffectedComment] = useState(null)

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, comment, slug, parent, replyOnUser }) => {
        return createNewComment({ token, comment, slug, parent, replyOnUser })
      },
      onSuccess: () => {
        toast.success(
          'Your comment is send successfully, it will be visible after the confirmation of the Admin'
        )
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      comment: value,
      parent,
      replyOnUser,
      token: JSON.parse(localStorage.getItem('accessToken')),
      slug: postSlug
    })
    setAffectedComment(null)
  }

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null)
  }

  const deleteCommentHandler = (commentId) => {
  }

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel='Send'
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className='space-y-4 mt-8'>
        {comments && comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentsContainer
