import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import { useEffect } from 'react';

function PostPage({ user, posts, getUserPosts }) {
  useEffect(() => {
    const loadPosts = async () => {
      await getUserPosts(user.id);
    };

    loadPosts();
  }, []);

  return (
    <div
      className="flex-col items-center w-50 center pa4"
      style={{
        backgroundColor: 'rgba(211, 211, 211, 0.3)',
      }}
    >
      {posts.map((post, index) => (
        <div key={index} className="w-full max-w-md pb2 pt2">
          <Post user={user} post={post} />
        </div>
      ))}
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
    getUserPosts: id => dispatch(fetchPosts(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
