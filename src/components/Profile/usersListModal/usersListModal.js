import { useState, useEffect } from 'react';
import './usersListModal.css';

export default function UsersListModal({
  isActive,
  setIsActive,
  usersList,
  listArg,
}) {
  const [isScrollLocked, setIsScrollLocked] = useState(true);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isScrollLocked]);

  console.log(usersList);

  return (
    <div
      className={isActive ? 'users-list-window active' : 'users-list-window'}
      onClick={() => {
        setIsScrollLocked(false);
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'users-list-modal active' : 'users-list-modal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='tc f2 fw6 green mt2'>
          {listArg === 'userId' ? 'Followers' : 'Followings'}
        </div>
        <div className='users-list'>
          {usersList.map(({ user, author }, index) => (
            <a
              href={
                listArg === 'userId'
                  ? `/profile/${author.id}`
                  : `/profile/${user.id}`
              }
              className='w-50 flex-ns items-center mv2 black no-underline'
              key={index}
              onClick={() => {
                setIsScrollLocked(false);
                setIsActive(false);
              }}
            >
              <div className='avatar-user-list'>
                <img
                  src={listArg === 'userId' ? author.avatar : user.avatar}
                  className='avatar-user-list-image'
                  alt=''
                />
              </div>
              <div className='fw6 f3 mh3'>
                {listArg === 'userId' ? author.username : user.username}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// listArg === 'userId' ? author.username : user.username
