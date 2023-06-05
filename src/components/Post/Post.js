import { useState } from 'react';
import CommentsModal from './commentModal/commentsModal';
import { connect } from 'react-redux';
import { fetchDeletePost } from '../../store/postSlice';
import { useLocation } from 'react-router-dom';
import './Post.css';
import { ReactComponent as Like } from '../../svg/like.svg';
import { ReactComponent as Comment } from '../../svg/comment.svg';
import { ReactComponent as Edit } from '../../svg/edit.svg';
import { fetchPostLikePost, fetchGetLikePost } from '../../store/postSlice';
import { ReactComponent as Delete } from '../../svg/delete.svg';
import EditPost from './editPostModal/editPostModal';
import {defaultAvatar} from '../../common/defaultAvatar'

function Post({ currentUser, post, deletePost, setUpdatePosts, likePost }) {
  const [commentsModalIsActive, setCommentsModalIsActive] = useState(false);
  const [editPostModalIsActive, setEditPostModalIsActive] = useState(false);
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const location = useLocation().pathname;
  const postManagement =
    post.author.id === currentUser.id && location.includes('/profile');

  const handleDeletePost = async () => {
    await deletePost(post.id);
    setUpdatePosts(true);
  };

  const handleLikePost = async () => {
    const result = await likePost(post.id);
    console.log(result);
    setUpdatePosts(true);
  };

  return (
    <div className='post'>
      <div className='flex-ns justify-between'>
        <div className='flex-ns items-center mb3'>
          <a href={`/profile/${post.author.id}`}>
            <div className='author-avatar ml2'>
              <img
                className='author-avatar-image'
                src={post.author.avatar || defaultAvatar}
                alt={post.author.username}
              />
            </div>
          </a>
          <a className='author-username' href={`/profile/${post.author.id}`}>
            {post.author.username}
          </a>
        </div>
        <div className='flex-ns items-center mb3 mr2'>
          {post.createdAt === post.updatedAt ? (
            <p className='time-label'>
              {new Date(post.createdAt).toLocaleString()}
            </p>
          ) : (
            <p className='time-label'>
              Updated {new Date(post.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>
      {!!post.url && (
        <div className='mb2'>
          <img className='content-image' src={post.url} alt='' />
        </div>
      )}
      {!!post.content && (
        <div className='content-text mh2 mb2'>{post.content}</div>
      )}
      {commentsModalIsActive && (
        <CommentsModal
          isActive={commentsModalIsActive}
          setIsActive={setCommentsModalIsActive}
          currentUser={currentUser}
          post={post}
        />
      )}
      {editPostModalIsActive && (
        <EditPost
          isActive={editPostModalIsActive}
          setIsActive={setEditPostModalIsActive}
        />
      )}
      <div className='flex-ns justify-between mh2 mt3'>
        <div className='flex-ns items-center'>
          <Like
            className={!isLiked ? `like mr1` : `liked mr1`}
            aria-label='Like'
            title='Like'
            onClick={() => {
              handleLikePost();
              setIsLiked(!isLiked);
            }}
          />
          <Comment
            className='comment ml1'
            title="Comment's"
            onClick={() => {
              setCommentsModalIsActive(true);
            }}
          />
        </div>
        {postManagement && (
          <div className='flex-ns'>
            <Edit
              className='edit mr1'
              title='Edit post'
              onClick={() => setEditPostModalIsActive(true)}
            />
            <Delete
              className='delete ml1'
              title='Delete post'
              onClick={() => handleDeletePost()}
            />
          </div>
        )}
      </div>
      <div className='mt3 ml2'>Likes: {post.likesCount}</div>
      <div className='mt1 ml2'>Comments: {post.commentsCount}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    postLikes: state.postSlice.postLikes,
    currentUser: state.userSlice.currentUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostLikes: (id) => dispatch(fetchGetLikePost(id)),
    likePost: (id) => dispatch(fetchPostLikePost(id)),
    deletePost: (id) => dispatch(fetchDeletePost(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
