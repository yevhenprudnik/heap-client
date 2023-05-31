import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';
import { useState, useEffect } from 'react';
import { api } from '../../api/api';

export default function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchPost();
  });

  const fetchUser = async () => {
    try {
      const responseAuth = await api.get('http://localhost:9000/auth');
      
      setUser(responseAuth.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPost = async () => {
    try {
      if (user) {
        const responsePost = await api.get('http://localhost:9000/post', {
          params: { authorId: user.id },
        });
        setPosts(responsePost.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-column justify-center mt3">
      {user && <Profile user={user} />}
      <div className="flex-col items-center w-50 center pa4 bg-light-gray">
        {posts.map((post, index) => (
          <div key={index} className="w-full max-w-md pb2 pt2">
            {<Post post={post} />}
          </div>
        ))}
      </div>
    </div>
  );
}
