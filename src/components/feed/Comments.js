import propTypes from 'prop-types';
import styled from 'styled-components';
import Comment from './Comment';

const CommentsContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

export default function Comments({ author, caption, commentNumber, comments }) {
  return (
    <CommentsContainer>
      <Comment author={author} text={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          text={comment.text}
        />
      ))}
    </CommentsContainer>
  );
}

Comments.propTypes = {
  author: propTypes.string.isRequired,
  caption: propTypes.string,
  commentNumber: propTypes.number.isRequired,
  comments: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      user: propTypes.shape({
        avatar: propTypes.string,
        username: propTypes.string.isRequired,
      }),
      text: propTypes.string.isRequired,
      isMine: propTypes.bool.isRequired,
      createdAt: propTypes.string.isRequired,
    })
  ),
};
