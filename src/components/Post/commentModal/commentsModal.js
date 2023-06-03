import React, { useEffect } from 'react';
import './commentsModal.css';
import Comment from '../comment/comment';
import { useState } from 'react';
import { fetchGetPostComments } from '../../../store/commentSlice';
import { fetchCreateCommentPost } from '../../../store/commentSlice';
import { connect } from 'react-redux';

function CommentsModal({
  isActive,
  setIsActive,
  user,
  comments,
  post,
  createCommentPost,
  getPostComments,
}) {
  const [content, setContent] = useState('');
  const [updateComments, setUpdateComments] = useState(false);
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  const handleCreateCommentPost = async () => {
    await createCommentPost({ content, id: post.id });
    await getPostComments(post.id);
  };

  useEffect(() => {
    const handleUpdateComments = async () => {
      await getPostComments(post.id);
    };
    if (updateComments === true) {
      handleUpdateComments();
      setUpdateComments(false);
    }

    handleUpdateComments();
  }, [updateComments]);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isScrollLocked]);

  return (
    <div
      className={isActive ? 'comments-window active' : 'comments-window'}
      onClick={() => {
        setIsScrollLocked(false);
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'commentsModal active' : 'commentsModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='comments'>
          {comments.map((comment, index) => (
            <Comment
              key={index}
              user={user}
              post={post}
              comment={comment}
              setUpdateComments={setUpdateComments}
            />
          ))}
        </div>
        <div className='add-comment flex-ns justify-between items-center'>
          <textarea
            type='text'
            className='comment-input f4'
            placeholder='Write comment...'
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className='comment-send'
            onClick={() => {
              handleCreateCommentPost();
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    comments: state.commentSlice.comments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostComments: (id) => dispatch(fetchGetPostComments(id)),
    createCommentPost: (payload) => dispatch(fetchCreateCommentPost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsModal);
