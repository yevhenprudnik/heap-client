import { useState } from 'react';
import { connect } from 'react-redux';
import { fetchPatchUser } from '../../../store/userSlice';

function ProfileSettings({ patchUser }) {
  const [mainMenuisActive, setMainMenuIsActive] = useState(true);
  const [usernameChangerIsActive, setUsernameChangerIsActive] = useState(false);
  const [username, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  const handlePatchUser = async () => {
    await patchUser({ username, avatar });
  };

  return (
    <div>
      {mainMenuisActive && (
        <div className="flex-ns flex-column">
          <button
            onClick={() => {
              setUsernameChangerIsActive(true);
              setMainMenuIsActive(false);
            }}
          >
            Change profile
          </button>
        </div>
      )}
      {usernameChangerIsActive && (
        <div className="flex-ns flex-column">
          <div>New username</div>
          <div>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </div>
          <div>New avatar (link)</div>
          <div>
            <input type="text" onChange={e => setAvatar(e.target.value)} />
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
            <button onClick={() => handlePatchUser()}>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    patchUser: payload => dispatch(fetchPatchUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
