import { Fragment } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FatText } from '../shared';

const CommentContainer = styled.div``;
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

export default function Comment({ author, text }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
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
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};
