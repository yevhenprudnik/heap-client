import { useState } from 'react';
import { connect } from 'react-redux';
import NewPostModal from './newPostModal/newPostModal';
import ProfileSettingsModal from './profileSettingsModal/profileSettingsModal';
import { ReactComponent as Add } from '../../svg/add.svg';
import { ReactComponent as Story } from '../../svg/story.svg';
import { ReactComponent as Settings } from '../../svg/settings.svg';
import '../../App.css';
import './Profile.css';

function Profile({ user }) {
  const [newPostIsActive, setNewPostIsActive] = useState(false);
  const [profileSettingsIsActive, setProfileSettingsIsActive] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUser = {
    id: 0,
    email: 'andrej.shmalenko@gmail.com',
    username: 'Xameon',
    avatar: '',
  };

  const defaultAvatar =
    'https://media.istockphoto.com/id/1369182324/vector/abstract-numbers-colorful-linear-set-modern-numeric-lines-with-new-pop-art-colors.jpg?s=612x612&w=0&k=20&c=HfhXlv6y7x5o1PuhBB2X2VC2kmsUcnMLV6lgFbLcjrc=';

  return (
    <div className='flex-ns flex-column items-center'>
      <div className='flex-ns profile'>
        <div className='avatar'>
          <img
            src={user.avatar || defaultAvatar}
            alt=''
            className='avatar-image'
          />
        </div>
        <div className='data'>
          <div className='username'>{user.username}</div>
          <div className='user-attributes mv3'>
            <div className='mh2'>54 followers</div>
            <div className='mh2'>313 followings</div>
            <div className='mh2'>94 posts</div>
          </div>
          {user.id !== currentUser.id && (
            <div className='w-100 flex-ns justify-center items-center'>
              <button
                className='w-100'
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'unfollow' : 'follow'}
              </button>
            </div>
          )}
        </div>
      </div>
      {user.id === currentUser.id && (
        <div className='options'>
          <NewPostModal
            isActive={newPostIsActive}
            setIsActive={setNewPostIsActive}
          />
          <div className='options-svg'>
            <Add onClick={() => setNewPostIsActive(!newPostIsActive)} />
            <div className='fw6 f4'>Add post</div>
          </div>

          <div className='options-svg'>
            <Story />
            <div className='fw6 f4'>New story</div>
          </div>
          <ProfileSettingsModal
            isActive={profileSettingsIsActive}
            setIsActive={setProfileSettingsIsActive}
          />
          <div className='options-svg'>
            <Settings
              onClick={() =>
                setProfileSettingsIsActive(!profileSettingsIsActive)
              }
            />
            <div className='fw6 f4'>Settings</div>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.userSlice.user,
  };
}

export default connect(mapStateToProps)(Profile);
