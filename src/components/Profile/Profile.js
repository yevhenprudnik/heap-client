import '../../App.css';

const userExample = {
  id: 2,
  email: 'andrej.shmalenko@gmail.com',
  username: 'Ganjubas',
};

export default function Profile() {
  return (
    <div className='flex-ns flex-column items-center'>
      <div className='fw4 f2'>
        <span className='fw6'>Username:</span> <>{userExample.username}</>
      </div>
      <div className='fw4 f2'>
        <span className='fw6'>Email:</span> <>{userExample.email}</>
      </div>
    </div>
  );
}
