import AsyncSelect from 'react-select/async';
import { api, clientUrl } from '../../api/api';
import { defaultAvatar } from '../../common/defaultAvatar';
import './SearchUser.css';

export default function SearchUser() {
  const loadOptions = async inputValue => {
    const response = await api(`/user?keyword=${inputValue}`);
    const users = response.data;

    return users.map(user => ({
      value: user?.id,
      label: (
        <a
          className="black no-underline"
          href={`${clientUrl}profile/` + user?.id}
        >
          <div className="flex-ns items-center justify-start fw6 f3">
            <div className="search-user-avatar mh2">
              <img
                className="search-user-avatar-image"
                src={user.avatar || defaultAvatar}
                alt={user.username}
              />
            </div>
            <div className="mh2">{user.username}</div>
          </div>
        </a>
      ),
    }));
  };

  const customStyles = {
    control: provided => ({
      ...provided,
      minWidth: '490px',
    }),
    menu: provided => ({
      ...provided,
      minWidth: '490px',
    }),
  };

  return (
    <AsyncSelect
      styles={customStyles}
      className="new-collection-selector w-25"
      loadOptions={loadOptions}
      placeholder="Search users..."
      maxMenuHeight={'80vh'}
    />
  );
}
