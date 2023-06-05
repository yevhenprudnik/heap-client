import Post from '../../components/Post/Post';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import { useEffect, useState } from 'react';

function PostPage({ posts, getPosts }) {
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      await getPosts();
    };

    if (updatePosts) {
      loadPosts();
      setUpdatePosts(false);
    }

    loadPosts();
  }, [getPosts, updatePosts]);

  console.log(posts);
  return (
    <div className="posts">
      {posts.map((post, index) => (
        <Post key={index} post={post} setUpdatePosts={setUpdatePosts} />
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
