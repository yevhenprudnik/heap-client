import '../../App.css';
import './Profile.css';

export default function Profile({ user }) {
  return (
    <div className="flex-ns flex-column items-center">
      <div className="flex-ns flex-column items-center w-50 bg-light-gray">
        <div className="flex-ns">
          <div className="flex-ns justify-center items-center w50p">
            <div className="avatar">
              <img src={user.avatar} alt="" className="avatar-image" />
            </div>
          </div>
          <div className="flex-ns flex-column">
            <div className="fw6 f1">{user.username}</div>
            <div className="flex-ns justify-around f3 tc mv1">
              <div className="pa1">7 publications</div>
              <div className="pa1">100 subscribers</div>
              <div className="pa1">13 subscriptions</div>
            </div>
            {/* <div className="f4 mt4">{user.desription}</div> */}
          </div>
        </div>
      </div>
      <div className="flex-ns justify-around w-50 mv3 pv3 bg-light-gray">
        <button>New post</button>
        <button>New story</button>
        <button>Settings</button>
      </div>
    </div>
  );
}
