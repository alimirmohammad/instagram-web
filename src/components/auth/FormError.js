import styled from 'styled-components';

const StyledFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0 10px;
`;

export default function FormError({ message }) {
  if (!message) return null;
  return <StyledFormError>{message}</StyledFormError>;
}
