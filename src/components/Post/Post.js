const defaultAvatar =
  'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg';

export default function Post({ post }) {
    return (
      <div className="bg-gray-100 shadow-md p-4 mb-4 bb">
        <div className="flex items-center mb-4">
          <div className="w-10">
            <img
              className="w-12 h-12 mr-4"
              style={{ borderRadius: '300%' }}
              src={post.author.avatar || defaultAvatar}
              alt={post.author.username}
            />
          </div>
          <h2 className="text-lg font-semibold">{post.author.username}</h2>
        </div>
        <div className="w-100">
          <img
            className="w-full br3 mb-4 w-100"
            src={post.url}
            alt="Post Content"
          />
        </div>
        <p className="text-base mb-2">{post.content}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <p>Created at: {new Date(post.createdAt).toLocaleString()}</p>
          <p>Updated at: {new Date(post.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    );
  };