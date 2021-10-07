import styled, { keyframes } from "styled-components";

const appear = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;

  }
`;

export const ErrorArea = styled.div`
  animation: ${appear} 3s;
  height: 18px;
  width: 295px;
  background-color: #fff;
  color: #ff0000;
  font-weight: bolder;
  margin-left: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  opacity: 0;

  .svgError {
    margin-right: 5px;
    height: 18px;
    width: 18px;
  }
`;
