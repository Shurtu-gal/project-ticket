import styled from 'styled-components'

export const Input = styled.input`
  background: linear-gradient(0deg, rgba(225, 225, 225, 0.06), rgba(225, 225, 225, 0.06));
  height: 19px;
  padding: 10px;
  margin: 5px 0px 20px 0px;
  border-radius: 11px;
  border: 1.8px solid #e88eff33;

  &:focus {
    outline: none;
    background: linear-gradient(0deg, rgba(232, 142, 255, 0.2), rgba(232, 142, 255, 0.2));
    border-color: #e88eff;
  }

  @media (max-width: 680px) {
    margin: 1vw 2vw;
  }
  @media (max-width: 680px) {
    height: 10px;
  }
  @media (max-width: 460px) {
    height: 6px;
  }
`
export const FormText = styled.p`
  border: 0px solid pink;
  margin: 3px 0px;
  @media (max-width: 680px) {
    height: 10px;
    margin: 3vw 2vw;
  }
`
