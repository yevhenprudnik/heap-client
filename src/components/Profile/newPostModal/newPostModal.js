import React from 'react';
import './newPostModal.css';

export default function NewPostModal({ isActive, setIsActive }) {
  return (
    <div
      className={isActive ? 'window active' : 'window'}
      onClick={() => {
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'newPostModal active' : 'newPostModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div>Image URL</div>
        <div>
          <input type='text' />
        </div>
        <div>Content</div>
        <div>
          <textarea />
        </div>
      </div>
    </div>
  );
}
