import { gql, useMutation } from '@apollo/client';
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../Avatar';
import { FatText } from '../shared';
import Comments from './Comments';

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 4px;
  margin-bottom: 60px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  width: 100%;
`;

const PhotoData = styled.div`
  padding: 12px 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

export default function Photo({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) {
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: { id },
    update: (cache, result) => {
      if (!result?.data?.toggleLike?.ok) return;
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          isLiked: prev => !prev,
          likes: prev => (isLiked ? prev - 1 : prev + 1),
        },
      });
    },
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Link to={`/users/${user.username}`}>
          <Avatar url={user.avatar} lg />
        </Link>
        <Link to={`/users/${user.username}`}>
          <Username>{user.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={toggleLikeMutation}>
              <FontAwesomeIcon
                style={{ color: isLiked ? 'tomato' : 'inherit' }}
                icon={isLiked ? faSolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? '1 like' : `${likes} likes`}</Likes>
        <Comments
          photoId={id}
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
}

Photo.propTypes = {
  id: propTypes.number.isRequired,
  user: propTypes.shape({
    avatar: propTypes.string,
    username: propTypes.string.isRequired,
  }),
  file: propTypes.string.isRequired,
  isLiked: propTypes.bool.isRequired,
  likes: propTypes.number.isRequired,
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
