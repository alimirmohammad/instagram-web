import { Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from '../shared';
import { gql, useMutation } from '@apollo/client';

const CommentContainer = styled.div`
  margin-bottom: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${props => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

export default function Comment({ id, photoId, isMine, author, text }) {
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumber: prev => prev - 1,
          },
        });
      }
    },
  });

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {text.split(' ').map((word, index) =>
          /#[\w]+/.test(word) ? (
            <Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{' '}
            </Fragment>
          ) : (
            <Fragment key={index}>{word} </Fragment>
          )
        )}
      </CommentCaption>
      {isMine && <button onClick={deleteCommentMutation}>❌</button>}
    </CommentContainer>
  );
}

Comment.propTypes = {
  isMine: propTypes.bool,
  id: propTypes.number,
  photoId: propTypes.number,
  author: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};
