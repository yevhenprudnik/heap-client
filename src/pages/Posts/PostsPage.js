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
    <div className='posts'>
      {posts.map((post, index) => (
          <Post key={index} user={user} post={post} />
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
