import { useState } from 'react';
import './comment.css';

export default function Comment({ user, comment }) {
  const [repliesIsOpen, setRepliesIsOpen] = useState(false);
  const [replyFieldIsOpen, setReplyFieldIsOpen] = useState(false);

  return (
    <div className='ma3'>
      <div className='f3'>
        <span className='fw6'>{comment.author.username}</span>
        {`: ${comment.content} id: ${comment.id}`}
      </div>
      <div className='flex-ns'>
        <button onClick={() => setReplyFieldIsOpen(!replyFieldIsOpen)}>
          {!replyFieldIsOpen ? 'reply' : 'close'}
        </button>
        <button>like</button>
        {user.id === comment.author.id && <button>edit</button>}
        {user.id === comment.author.id && <button>delete</button>}
      </div>
      {replyFieldIsOpen && (
        <div>
          <textarea/>
          <button>Enter</button>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div>
          <button onClick={() => setRepliesIsOpen(!repliesIsOpen)}>
            {!repliesIsOpen ? 'show replies' : 'hide replies'}
          </button>
          <ul className={`replies-list ${repliesIsOpen && 'open'}`}>
            {comment.replies.map((reply, index) => (
              <li
                key={index}
              >{`${reply.author.username}: ${reply.content}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
