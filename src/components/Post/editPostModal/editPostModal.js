import './editPostModal.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatchPost } from '../../../store/postSlice';

function EditPost({ isActive, setIsActive, patchPost, post }) {
  const [isScrollLocked, setIsScrollLocked] = useState(true);
  const [url, setUrl] = useState();
  const [content, setContent] = useState();

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
        onClick={e => e.stopPropagation()}
      >
        <div className="flex-ns flex-column w-100 h-100 justify-center items-center">
          <div>New Image</div>
          <div>
            <input type="text" onChange={e => setUrl(e.target.value)} />
          </div>
          <div>New Content</div>
          <div>
            <input type="text" onChange={e => setContent(e.target.value)} />
          </div>
          <div>
            <button onClick={() => handlePatchPost()}>Enter</button>
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
    patchPost: payload => dispatch(fetchPatchPost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
