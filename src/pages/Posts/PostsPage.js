import Post from '../../components/Post/Post';
import { useState, useEffect } from 'react';
import { api } from '../../api/api';

export default function PostPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('http://localhost:9000/post');

      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex-col items-center w-50 center pa4"
      style={{
        backgroundColor: 'rgba(211, 211, 211, 0.3)',
      }}
    >
      {posts.map((post, index) => (
        <div key={index} className="w-full max-w-md pb2 pt2">
          <Post post={post} />
        </div>
      ))}
    </div>
  );
}
