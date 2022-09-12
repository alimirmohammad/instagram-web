import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

export default function BottomBox({ cta, link, linkText }) {
  return (
    <StyledBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </StyledBottomBox>
  );
}

const StyledBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.accent};
    margin-left: 5px;
  }
`;

BottomBox.propTypes = {
  cta: propTypes.string.isRequired,
  link: propTypes.string.isRequired,
  linkText: propTypes.string.isRequired,
};
