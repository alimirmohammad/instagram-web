import { gql, useMutation } from '@apollo/client';
import propTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
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

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $text: String!) {
    createComment(photoId: $photoId, text: $text) {
      ok
      id
      error
    }
  }
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${props => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

export default function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}) {
  const userData = useUser();
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: (cache, result) => {
        const { text } = getValues();
        setValue('text', '');
        const {
          data: {
            createComment: { ok, id },
          },
        } = result;
        if (ok && userData?.me) {
          const newComment = {
            __typename: 'Comment',
            createdAt: Date.now().toString(),
            id,
            isMine: true,
            text,
            user: userData.me,
          };
          const newCacheComment = cache.writeFragment({
            data: newComment,
            fragment: gql`
              fragment NewComment on Comment {
                id
                createdAt
                isMine
                text
                user {
                  username
                  avatar
                }
              }
            `,
          });
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments: prev => prev.concat(newCacheComment),
              commentNumber: prev => prev + 1,
            },
          });
        }
      },
    }
  );
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onValid = data => {
    if (loading) return;
    const { text } = data;
    createCommentMutation({
      variables: {
        photoId,
        text,
      },
    });
  };

  return (
    <CommentsContainer>
      <Comment author={author} text={caption} />
      <CommentCount>
        {commentNumber === 1 ? '1 comment' : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map(comment => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment.user.username}
          text={comment.text}
          isMine={comment.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register('text', { required: true })}
            type="text"
            placeholder="Write a comment..."
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  photoId: propTypes.number.isRequired,
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
