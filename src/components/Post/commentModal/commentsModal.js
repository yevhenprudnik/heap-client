import React from 'react';
import './commentsModal.css';
import Comment from '../comment/comment';

export default function CommentsModal({ isActive, setIsActive, user, comments }) {
  return (
    <div
      className={isActive ? 'window active' : 'window'}
      onClick={() => {
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'commentsModal active' : 'commentsModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='comments'>
          {comments.map((comment, index) => (
            <Comment key={index} user = {user} comment={comment} />
          ))}
        </div>
        <div className='add-comment flex-ns justify-between'>
          <textarea type='text' className='comment-input f4' placeholder='Write comment...' />
          <button className='comment-enter'>Enter</button>
        </div>
      </div>
    </div>
  );
}
