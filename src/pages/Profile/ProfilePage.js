import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../../store/postSlice';
import { useEffect, useState } from 'react';
import './ProfilePage.css';

function ProfilePage({ user, posts, getUserPosts }) {
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      await getUserPosts(user.id);
    };
    if (updatePosts === true) {
      loadPosts();
      setUpdatePosts(false);
    }

    loadPosts();
  }, [updatePosts]);

  return (
    <div className='flex-column justify-center mt3'>
      <Profile userExample={user} />
      <div className='posts'>
        {posts.map((post, index) => (
            user.id === post.author.id && (
              <Post key={index} user={user} post={post} setUpdatePosts={setUpdatePosts} />
            )
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userSlice.user,
    posts: state.postSlice.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getUserPosts: (id) => dispatch(fetchUserPosts(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
