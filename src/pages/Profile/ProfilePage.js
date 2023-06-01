import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchUserPosts } from '../../store/postSlice';
import { useEffect, useState } from 'react';

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
    <div className="flex-column justify-center mt3">
      <Profile userExample={user} />
      <div className="flex-col items-center w-50 center pa4 bg-light-gray">
        {posts.map((post, index) => (
          <div key={index} className="w-full max-w-md pb2 pt2">
            {user.id === post.author.id && (
              <Post user={user} post={post} setUpdatePosts={setUpdatePosts} />
            )}
          </div>
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
    getUserPosts: id => dispatch(fetchUserPosts(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
