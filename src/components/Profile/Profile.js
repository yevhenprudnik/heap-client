import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { api } from '../../api/api';
import NewPostModal from './newPostModal/newPostModal';
import ProfileSettingsModal from './profileSettingsModal/profileSettingsModal';
import UsersListModal from './usersListModal/usersListModal';
import { ReactComponent as Add } from '../../svg/add.svg';
import { ReactComponent as Settings } from '../../svg/settings.svg';
import { defaultAvatar } from '../../common/defaultAvatar';
import '../../App.css';
import './Profile.css';
import {
  fetchFollowList,
  fetchFollowUser,
  fetchUnfollowUser,
} from '../../store/userSlice';

function Profile({
  currentUser,
  targetUser,
  followList,
  getFollowList,
  follow,
  unfollow,
}) {
  const [newPostIsActive, setNewPostIsActive] = useState(false);
  const [profileSettingsIsActive, setProfileSettingsIsActive] = useState(false);
  const [usersListIsActive, setUsersListIsActive] = useState(false);
  const [userListArg, setUserListArg] = useState('userId');
  const [isFollowed, setIsFollowed] = useState(false);
  const [followId, setFollowId] = useState(-1);

  useEffect(() => {
    async function checkIsFollowed() {
      if (targetUser.id && currentUser.id) {
        const response = await api.get(
          `follow/?authorId=${currentUser.id}&&userId=${targetUser.id}`
        );
        const isFollowedList = response.data;
        if (isFollowedList.length) {
          setIsFollowed(true);
          setFollowId(isFollowedList[0].id);
        }
      }
    }
    checkIsFollowed();
  }, [currentUser.id, targetUser.id]);

  async function openUsersList(key) {
    await getFollowList({ key, id: targetUser.id });
    setUserListArg(key);
    setUsersListIsActive(true);
  }

  async function handleFollow() {
    if (!isFollowed) {
      await follow(targetUser.id);
    } else {
      await unfollow(followId);
    }

    setIsFollowed(!isFollowed);
  }

  return (
    <div className='flex-ns flex-column items-center'>
      <div className='flex-ns profile'>
        <div className='avatar'>
          <img
            src={targetUser.avatar || defaultAvatar}
            alt=''
            className='avatar-image'
          />
        </div>
        <div className='data flex-ns flex-column justify-around'>
          <div
            className={
              targetUser?.username?.length <= 15 ? 'username' : 'username long'
            }
          >
            {targetUser.username}
          </div>
          {usersListIsActive && (
            <UsersListModal
              isActive={usersListIsActive}
              setIsActive={setUsersListIsActive}
              usersList={followList}
              listArg={userListArg}
            />
          )}
          <div className='user-attributes'>
            <div
              className='mh2 tc pointer'
              onClick={() => openUsersList('userId')}
            >{`${targetUser.followersCount} followers`}</div>
            <div
              className='mh2 tc pointer'
              onClick={() => openUsersList('authorId')}
            >{`${targetUser.followingsCount} followings`}</div>
            <div className='mh2 tc'>{`${targetUser.postsCount} posts`}</div>
          </div>
          <div className='w-100 flex-ns justify-center'>
            {currentUser.id !== targetUser.id && (
              <button
                className={isFollowed ? 'unfollow-btn' : 'follow-btn'}
                onClick={() => handleFollow()}
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
        </div>
      </div>
      {currentUser.id === targetUser.id && (
        <div className='options'>
          <NewPostModal
            isActive={newPostIsActive}
            setIsActive={setNewPostIsActive}
          />
          <div className='options-svg'>
            <Add onClick={() => setNewPostIsActive(!newPostIsActive)} />
            <div className='fw6 f4'>Add post</div>
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

function mapDispatchToProps(dispatch) {
  return {
    getFollowList: (searchObject) => dispatch(fetchFollowList(searchObject)),
    follow: (userId) => dispatch(fetchFollowUser(userId)),
    unfollow: (id) => dispatch(fetchUnfollowUser(id)),
  };
}

function mapStateToProps(state) {
  return {
    targetUser: state.userSlice.targetUser,
    currentUser: state.userSlice.currentUser,
    followList: state.userSlice.followList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
