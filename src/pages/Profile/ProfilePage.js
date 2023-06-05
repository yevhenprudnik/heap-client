import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../../store/postSlice';
import { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useParams } from 'react-router-dom';
import { fetchTargetUser } from '../../store/userSlice';

function ProfilePage({
  targetUser,
  posts,
  getUserPosts,
  currentUser,
  getTargetUser,
}) {
  const { id } = useParams();
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      await getTargetUser(id);
      await getUserPosts(id);
    };
    if (updatePosts) {
      loadPosts();
      setUpdatePosts(false);
    }

    loadPosts();
  }, [updatePosts, id, getUserPosts, getTargetUser]);

  return (
    <div className="flex-column justify-center mt3">
      <Profile />
      <div className="posts pt3">
        {posts.map((post, index) => (
          <Post
            key={index}
            targetUser={targetUser}
            currentUser={currentUser}
            post={post}
            setUpdatePosts={setUpdatePosts}
          />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    targetUser: state.userSlice.targetUser,
    currentUser: state.userSlice.currentUser,
    posts: state.postSlice.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTargetUser: id => dispatch(fetchTargetUser(id)),
    getUserPosts: id => dispatch(fetchUserPosts(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
