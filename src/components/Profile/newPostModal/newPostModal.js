import React from 'react';
import './newPostModal.css';
import { fetchCreatePost } from '../../../store/postSlice';
import { connect } from 'react-redux';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';
import { v4 } from 'uuid';
import LoaderModal from '../../LoaderModal/LoaderModal';
import Loader from '../../LoaderModal/Loader';

function NewPostModal({ isActive, setIsActive, createPost }) {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async file => {
    if (file === null) return;

    const imageRef = ref(storage, `images/${file.name + v4()}`);

    const snapshot = await uploadBytes(imageRef, file);

    const url = await getDownloadURL(snapshot.ref);

    setImgUrl(url);
  };

  const pushPost = async () => {
    setIsLoading(true);
    await createPost({ content, imgUrl });
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div
      className={isActive ? 'new-post-window active' : 'new-post-window'}
      onClick={() => {
        setIsActive(false);
      }}
    >
      {isLoading && (
        <LoaderModal>
          <Loader />
        </LoaderModal>
      )}
      <div
        className={isActive ? 'newPostModal active' : 'newPostModal'}
        onClick={e => e.stopPropagation()}
      >
        <div className="mv5">
          {/* <input type='text' onChange={(e) => setImgUrl(e.target.value)} /> */}
          <input
            type="file"
            onChange={event => {
              uploadFile(event.target.files[0]);
            }}
          />
        </div>
        <img src={imgUrl} alt="" />
        <div>Content</div>
        <div>
          <textarea onChange={e => setContent(e.target.value)} />
        </div>
        <div>
          <button
            onClick={async () => {
              await pushPost();
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
    createPost: payload => dispatch(fetchCreatePost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
