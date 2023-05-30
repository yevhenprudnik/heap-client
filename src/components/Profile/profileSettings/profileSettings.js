import { useState } from 'react';

export default function ProfileSettings() {
  const [mainMenuisActive, setMainMenuIsActive] = useState(true);
  const [usernameChangerIsActive, setUsernameChangerIsActive] = useState(false);
  const [passwordChangerIsActive, setPasswordChangerIsActive] = useState(false);

  return (
    <div>
      {mainMenuisActive && (
        <div className='flex-ns flex-column'>
          <button
            onClick={() => {
              setUsernameChangerIsActive(true);
              setMainMenuIsActive(false);
            }}
          >
            Change profile
          </button>
          <button
            onClick={() => {
              setPasswordChangerIsActive(true);
              setMainMenuIsActive(false);
            }}
          >
            Change password
          </button>
        </div>
      )}
      {usernameChangerIsActive && (
        <div className='flex-ns flex-column'>
          <div>New username</div>
          <div>
            <input type='text' />
          </div>
          <div>New avatar (link)</div>
          <div>
            <input type='text' />
          </div>
          <div>
            <button
              onClick={() => {
                setMainMenuIsActive(true);
                setUsernameChangerIsActive(false);
              }}
            >
              Back
            </button>
            <button>Apply</button>
          </div>
        </div>
      )}
      {passwordChangerIsActive && (
        <div className='flex-ns flex-column'>
          <div>New password</div>
          <div>
            <input type='password' />
          </div>
          <div>Confirm new password</div>
          <div>
            <input type='password' />
          </div>
          <div>
            <button
              onClick={() => {
                setMainMenuIsActive(true);
                setPasswordChangerIsActive(false);
              }}
            >
              Back
            </button>
            <button>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}
