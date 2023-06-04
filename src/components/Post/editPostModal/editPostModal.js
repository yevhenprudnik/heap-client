import './editPostModal.css';
import { useState, useEffect   } from 'react';

export default function EditPost({isActive, setIsActive}) {

  console.log(setIsActive);
  
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

  return (
    <div
      className={isActive ? 'editPost-window active' : 'editPost-window'}
      onClick={() => {
        setIsScrollLocked(false);
        setIsActive(false);
      }}
    >
      <div
        className={isActive ? 'editPostModal active' : 'editPostModal'}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex-ns flex-column w-100 h-100 justify-center items-center'>
          <div>New Image</div>
          <div>
            <input type='text' />
          </div>
          <div>New Content</div>
          <div>
            <input type='text' />
          </div>
          <div>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
}
