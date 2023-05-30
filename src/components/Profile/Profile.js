import { useState } from 'react';
import NewPostModal from './newPostModal/newPostModal';
import ProfileSettingsModal from './profileSettingsModal/profileSettingsModal';
import '../../App.css';
import './Profile.css';

export default function Profile({ userExample }) {
  const [newPostIsActive, setNewPostIsActive] = useState(false);
  const [profileSettingsIsActive, setProfileSettingsIsActive] = useState(false);

  return (
    <div className='flex-ns flex-column items-center'>
      <div className='flex-ns flex-column items-center w-50 bg-light-gray'>
        <div className='flex-ns'>
          <div className='flex-ns justify-center items-center w50p'>
            <div className='avatar'>
              <img src={userExample.avatar} alt='' className='avatar-image' />
            </div>
          </div>
          <div className='flex-ns flex-column'>
            <div className='fw6 f1'>{userExample.username}</div>
            <div className='flex-ns justify-around f3 tc mv1'>
              <div className='pa1'>7 publications</div>
              <div className='pa1'>100 subscribers</div>
              <div className='pa1'>13 subscriptions</div>
            </div>
            <div className='f4 mt4'>{userExample.desription}</div>
          </div>
        </div>
      </div>
      <div className='flex-ns justify-around w-50 mv3 pv3 bg-light-gray'>
        <NewPostModal
          isActive={newPostIsActive}
          setIsActive={setNewPostIsActive}
        />
        <button onClick={() => setNewPostIsActive(!newPostIsActive)}>
          New post
        </button>
        <button>New story</button>
        <ProfileSettingsModal
          isActive={profileSettingsIsActive}
          setIsActive={setProfileSettingsIsActive}
        />
        <button
          onClick={() => setProfileSettingsIsActive(!profileSettingsIsActive)}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
