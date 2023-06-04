import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import { useEffect } from 'react';

function PostPage({ posts, getPosts }) {
  useEffect(() => {
    const loadPosts = async () => {
      await getPosts();
    };

    loadPosts();
  }, [getPosts]);

  console.log(posts);
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    posts: state.postSlice.posts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: id => dispatch(fetchPosts(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
