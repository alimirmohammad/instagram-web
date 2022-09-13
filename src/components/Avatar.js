import styled from 'styled-components';

const StyledAvatar = styled.div`
  width: ${props => (props.lg ? '30px' : '25px')};
  height: ${props => (props.lg ? '30px' : '25px')};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

export default function Avatar({ url = '', lg = false }) {
  return <StyledAvatar lg={lg}>{url ? <Img src={url} /> : null}</StyledAvatar>;
}
