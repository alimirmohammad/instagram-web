import styled from 'styled-components';
import { BaseBox } from '../shared';

export default function FormBox({ children }) {
  return <StyledBox>{children}</StyledBox>;
}

const StyledBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;
