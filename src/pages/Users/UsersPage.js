import SearchUser from '../../components/SearchUser/SearchUser';
import './UsersPage.css';

export default function UsersPage() {
  return (
    <div className='flex-ns flex-column'>
      <div className='w-100 flex-ns justify-center mt3'>
        <div>
          <SearchUser />
        </div>
      </div>
    </div>
  );
}
