import { useState } from 'react';
import CommentsModal from './commentModal/commentsModal';
import { connect } from 'react-redux';
import { fetchDeletePost } from '../../store/postSlice';
import { useLocation } from 'react-router-dom';
import './Post.css';
import { ReactComponent as Like } from '../../svg/like.svg';
import { ReactComponent as Comment } from '../../svg/comment.svg';
import { ReactComponent as Edit } from '../../svg/edit.svg';
import { ReactComponent as Delete } from '../../svg/delete.svg';
import EditPost from './editPostModal/editPostModal';

const defaultAvatar =
  'https://media.istockphoto.com/id/1369182324/vector/abstract-numbers-colorful-linear-set-modern-numeric-lines-with-new-pop-art-colors.jpg?s=612x612&w=0&k=20&c=HfhXlv6y7x5o1PuhBB2X2VC2kmsUcnMLV6lgFbLcjrc=';

function Post({ user, post, deletePost, setUpdatePosts }) {
  const [commentsModalIsActive, setCommentsModalIsActive] = useState(false);
  const [editPostModalIsActive, setEditPostModalIsActive] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const location = useLocation().pathname;
  const postManagement = post.author.id === user.id && location === '/profile';

  const handleDeletePost = async () => {
    await deletePost(post.id);
    setUpdatePosts(true);
  };

  return (
    <div className='post'>
      <div className='flex-ns justify-between'>
        <div className='flex-ns items-center mb3'>
          <div className='author-avatar ml2'>
            <img
              className='author-avatar-image'
              src={post.author.avatar || defaultAvatar}
              alt={post.author.username}
            />
          </div>
          <div className='author-username'>{post.author.username}</div>
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
          <img className='content-image' src={post.url} alt='Post Content' />
        </div>
      )}
      {!!post.content && (
        <div className='content-text mh2 mb2'>{post.content}</div>
      )}
      {commentsModalIsActive && (
        <CommentsModal
          isActive={commentsModalIsActive}
          setIsActive={setCommentsModalIsActive}
          user={user}
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
            onClick={() => setIsLiked(!isLiked)}
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
      <div className='mt3 ml2'>Likes: {post.likeCount}</div>
      <div className='mt1 ml2'>Comments: 313</div>
      {/* ############################################################# */}
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => dispatch(fetchDeletePost(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
