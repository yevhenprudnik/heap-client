import React from 'react';
import './profileSettingsModal.css';
import ProfileSettings from '../profileSettings/profileSettings';

export default function ProfileSettingsModal({ isActive, setIsActive }) {
  return (
    <div
      className={isActive ? 'profile-settings-window active' : 'profile-settings-window'}
      onClick={() => {
        setIsActive(false);
      }}
    >
      <div
        className={
          isActive ? 'profileSettingsModal active' : 'profileSettingsModal'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <ProfileSettings />
      </div>
    </div>
  );
}
