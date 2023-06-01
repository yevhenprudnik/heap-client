import { useEffect, useState } from 'react';
import './comment.css';
import {
  fetchDeleteComment,
  fetchCreateCommentReply,
} from '../../../store/commentSlice';
import { connect } from 'react-redux';

function Comment({
  user,
  comment,
  deleteComment,
  createCommentReply,
  setUpdateComments,
}) {
  const [repliesIsOpen, setRepliesIsOpen] = useState(false);
  const [replyFieldIsOpen, setReplyFieldIsOpen] = useState(false);

  const [content, setContent] = useState('');

  const handleCreateCommentReply = async () => {
    await createCommentReply({ content, id: comment.id });
    setUpdateComments(true);
  };

  const handleDeleteComment = async () => {
    await deleteComment(comment.id);
    setUpdateComments(true);
  };

  return (
    <div className="ma3">
      <div className="f3">
        <span className="fw6">{comment.author.username}</span>
        {`: ${comment.content} id: ${comment.id}`}
      </div>
      <div className="flex-ns">
        <button onClick={() => setReplyFieldIsOpen(!replyFieldIsOpen)}>
          {!replyFieldIsOpen ? 'reply' : 'close'}
        </button>
        <button>like</button>
        {user.id === comment.author.id && <button>edit</button>}
        {user.id === comment.author.id && (
          <button onClick={() => handleDeleteComment()}>delete</button>
        )}
      </div>
      {replyFieldIsOpen && (
        <div>
          <textarea onChange={e => setContent(e.target.value)} />
          <button onClick={() => handleCreateCommentReply()}>Enter</button>
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

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    createCommentReply: payload => dispatch(fetchCreateCommentReply(payload)),
    deleteComment: id => dispatch(fetchDeleteComment(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
