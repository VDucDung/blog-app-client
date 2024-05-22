import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Comment from './Comment'
import CommentForm from './CommentForm'
import {
  createNewComment,
  updateComment,
  deleteComment
} from 'services/index/comments'

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug
}) => {
  const queryClient = useQueryClient()
  const [affectedComment, setAffectedComment] = useState(null)

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, comment, slug, parent, replyOnUser }) => {
        return createNewComment({ token, comment, slug, parent, replyOnUser })
      },
      onSuccess: () => {
        toast.success(
          'Your comment is sent successfully, it will be visible after the confirmation of the Admin'
        )
      },
      onError: (error) => {
        toast.error(error.message)
      }
    })

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, comment, commentId }) => {
      return updateComment({ token, comment, commentId })
    },
    onSuccess: () => {
      toast.success('Your comment is updated successfully')
      queryClient.invalidateQueries(['blog', postSlug])
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteComment({ token, commentId })
    },
    onSuccess: () => {
      toast.success('Your comment is deleted successfully')
      queryClient.invalidateQueries(['blog', postSlug])
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
    mutateUpdateComment({
      token: JSON.parse(localStorage.getItem('accessToken')),
      comment: value,
      commentId
    })
    setAffectedComment(null)
  }

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: JSON.parse(localStorage.getItem('accessToken')),
      commentId
    })
  }

  return (
    <div className={`${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHanlder={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />
      <div className="mt-8 space-y-4">
        {comments &&
          comments.map((comment) => (
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
