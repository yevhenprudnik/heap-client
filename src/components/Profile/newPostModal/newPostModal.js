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
import { ReactComponent as ImageInput } from '../../../svg/image.svg';
import { ReactComponent as SendPost } from '../../../svg/send_post.svg';

function NewPostModal({ isActive, setIsActive, createPost }) {
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadFile = async (file) => {
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
        onClick={(e) => e.stopPropagation()}
      >
        <div className='new-post-image-div'>
          <img src={imgUrl} className='new-post-image' alt='' />
        </div>
        <div className='flex-ns justify-between items-center new-post-input'>
          <div className='w-90 h-100'>
            <textarea
              className='new-post-content f4'
              placeholder='Post description...'
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <SendPost
              className={!imgUrl && !content.trim().length? 'send-post disabled': 'send-post'}
              onClick={async () => {
                await pushPost();
              }}
            />
          </div>
          <div>
            <label htmlFor='file-upload' className='file-upload-label'>
              <ImageInput className={'file-upload-icon'} />
            </label>
            <input
              type='file'
              id='file-upload'
              className='file-upload-input'
              accept='image/png, image/jpg, image/gif, image/jpeg'
              onChange={(event) => {
                uploadFile(event.target.files[0]);
              }}
            />
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
    createPost: (payload) => dispatch(fetchCreatePost(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPostModal);
