import React from 'react';
import './newPostModal.css';
import { fetchCreatePost } from '../../../store/postSlice';
import { connect } from 'react-redux';
import { useState } from 'react';

function NewPostModal({ isActive, setIsActive, createPost }) {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const pushPost = async () => {
    await createPost({ content, imgUrl });
  };

  return (
    <div
      className={isActive ? 'new-post-window active' : 'new-post-window'}
      onClick={() => {
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'newPostModal active' : 'newPostModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div>Image URL</div>
        <div>
          <input type='text' onChange={(e) => setImgUrl(e.target.value)} />
        </div>
        <div>Content</div>
        <div>
          <textarea onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <button
            onClick={() => {
              pushPost();
              window.location.reload();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: (payload) => dispatch(fetchCreatePost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
