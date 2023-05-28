import Profile from '../../components/Profile/Profile';
import Post from '../../components/Post/Post';

const posts = [
  {
    id: 1,
    content: 'Exciting news! Our new website is live now. Check it out!',
    url: 'https://www.freecodecamp.org/news/content/images/2022/02/arrows-2889040_1920.jpg',
    author: {
      id: 1,
      username: 'john_doe',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzjD-E_9bGnUgPaB6Zn81acRyi2lc-zqLqA&usqp=CAU',
    },
    createdAt: '2023-05-23T05:46:11.848Z',
    updatedAt: '2023-05-23T05:46:11.848Z',
  },
  {
    id: 2,
    content:
      'Just published a new blog post about the latest trends in technology.',
    url: 'https://www.imgonline.com.ua/examples/random-pixels-big.png',
    author: {
      id: 2,
      username: 'Ganjubas',
      avatar:
        'https://media.istockphoto.com/id/1369182324/vector/abstract-numbers-colorful-linear-set-modern-numeric-lines-with-new-pop-art-colors.jpg?s=612x612&w=0&k=20&c=HfhXlv6y7x5o1PuhBB2X2VC2kmsUcnMLV6lgFbLcjrc=',
    },
    createdAt: '2023-05-23T05:46:11.848Z',
    updatedAt: '2023-05-23T05:46:11.848Z',
  },
  {
    id: 3,
    content:
      'Sharing a recipe for a delicious chocolate cake. You can find the detailed instructions on our website.',
    url: 'https://www.imgonline.com.ua/examples/bee-on-daisy.jpg',
    author: { id: 3, username: 'chef_mike' },
    createdAt: '2023-05-23T05:46:11.848Z',
    updatedAt: '2023-05-23T05:46:11.848Z',
  },
  {
    id: 4,
    content:
      "We just launched a new product. Don't miss out on the exciting features!",
    url: 'https://ik.imagekit.io/ikmedia/backlit.jpg',
    author: {
      id: 4,
      username: 'marketing_guru',
      avatar:
        'https://images.unsplash.com/photo-1593626986521-f24d25d60103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlZCUyMGNhdHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    },
    createdAt: '2023-05-23T05:46:11.848Z',
    updatedAt: '2023-05-23T05:46:11.848Z',
  },
  {
    id: 5,
    content:
      'Join us for an exclusive webinar on digital marketing strategies.',
    url: 'https://www.w3schools.com/w3css/img_forest.jpg',
    author: { id: 5, username: 'webinar_expert' },
    createdAt: '2023-05-23T05:46:11.848Z',
    updatedAt: '2023-05-23T05:46:11.848Z',
  },
];

const userExample = {
  id: 2,
  email: 'andrej.shmalenko@gmail.com',
  username: 'Ganjubas',
  avatar:
    'https://media.istockphoto.com/id/1369182324/vector/abstract-numbers-colorful-linear-set-modern-numeric-lines-with-new-pop-art-colors.jpg?s=612x612&w=0&k=20&c=HfhXlv6y7x5o1PuhBB2X2VC2kmsUcnMLV6lgFbLcjrc=',
  desription: 'Some text no more than 2000 characters...',
};

export default function ProfilePage() {
  return (
    <div className='flex-column justify-center mt3'>
      <Profile userExample={userExample} />
      <div
        className='flex-col items-center w-50 center pa4 bg-light-gray'
      >
        {posts.map((post, index) => (
          <div key={index} className='w-full max-w-md pb2 pt2'>
            {userExample.id === post.author.id && <Post post={post} />}
          </div>
        ))}
      </div>
    </div>
  );
}
