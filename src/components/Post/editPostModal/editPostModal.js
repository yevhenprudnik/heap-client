import './editPostModal.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatchPost } from '../../../store/postSlice';
import {ReactComponent as RefreshPost} from '../../../svg/refresh_post.svg';

function EditPost({
  isActive,
  setIsActive,
  patchPost,
  post,
  currentUrl,
  currentText,
}) {
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [url, setUrl] = useState(currentUrl);
  const [content, setContent] = useState(currentText);

  const handlePatchPost = async () => {
    await patchPost({ id: post.id, url, content });
    window.location.reload();
  };

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
      className={isActive ? 'editPost-window active' : 'editPost-window'}
      onClick={() => {
        setIsScrollLocked(false);
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'editPostModal active' : 'editPostModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex-ns flex-column w-100 h-100 justify-between items-center pa3'>
          <div className='edit-post-url'>
            <input
              type='text'
              className='edit-post-url-input'
              placeholder='Refresh or add image URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className='edit-post-text'>
            <textarea
              type='text'
              value={content}
              placeholder='Refresh or add text content'
              className='edit-post-text-input f4'
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className='refresh-post' onClick={() => handlePatchPost()}>
            <RefreshPost/>
            <div>Refresh</div>
          </div>
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
    patchPost: (payload) => dispatch(fetchPatchPost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
