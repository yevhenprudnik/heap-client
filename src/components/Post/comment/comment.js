import { useState } from 'react';
import './comment.css';
import {
  fetchDeleteComment,
  fetchCreateCommentReply,
} from '../../../store/commentSlice';
import { connect } from 'react-redux';
import { ReactComponent as Reply } from '../../../svg/reply.svg';
import { ReactComponent as LikeComment } from '../../../svg/like_comment.svg';
import { ReactComponent as DeleteComment } from '../../../svg/delete_comment.svg';
import { ReactComponent as CloseReply } from '../../../svg/close_reply.svg';
import {ReactComponent as SendReply} from '../../../svg/send_reply.svg';

function Comment({
  user,
  comment,
  deleteComment,
  createCommentReply,
  setUpdateComments,
}) {
  const [repliesIsOpen, setRepliesIsOpen] = useState(false);
  const [replyFieldIsOpen, setReplyFieldIsOpen] = useState(false);
  const [isLikedComment, setIsLikedComment] = useState(false);

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
    <div className='comment-component pv3'>
      <div className='comment-content'>
        <span className='fw6'>{comment.author.username}</span>
        {`: ${comment.content}`}
      </div>
      <div className='flex-ns justify-between'>
        <div className='replyBtn'
            onClick={() => setReplyFieldIsOpen(!replyFieldIsOpen)}
          >
            {replyFieldIsOpen? <CloseReply /> : <Reply />}
            <div className='reply-label'>
              {!replyFieldIsOpen ? 'reply' : 'close'}
          </div>
        </div>
        <div>
          <LikeComment
            className={!isLikedComment ? 'like-comment mh2' : 'liked-comment ph2'}
            title='Like comment'
            onClick={() => setIsLikedComment(!isLikedComment)}
          />
          {user.id === comment.author.id && (
            <DeleteComment
              className='delete-comment ph1'
              title='Delete comment'
              onClick={() => handleDeleteComment()}
            />
          )}
        </div>
      </div>
      {replyFieldIsOpen && (
        <div className='flex-ns items-center justify-between'>
          <textarea className='reply-area' placeholder='Reply...' onChange={(e) => setContent(e.target.value)} />
          <SendReply className='send-reply-btn' title='Send reply' onClick={() => handleCreateCommentReply()}/>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className='flex-ns'>
          <button
            className='repliesToggleBtn'
            onClick={() => setRepliesIsOpen(!repliesIsOpen)}
          >
            {!repliesIsOpen ? 'show replies' : 'hide replies'}
          </button>
          <ul className={`replies-list ${repliesIsOpen && 'open'}`}>
            {comment.replies.map((reply, index) => (
              <li
                key={index}
              ><span className='fw6'>{`${reply.author.username}:`}</span>{` ${reply.content}`}</li>
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
    createCommentReply: (payload) => dispatch(fetchCreateCommentReply(payload)),
    deleteComment: (id) => dispatch(fetchDeleteComment(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
