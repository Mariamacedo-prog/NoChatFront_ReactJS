import styled from "styled-components";

export const Position = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: #272727;
  opacity: 0.8;
`;
export const Container = styled.div`
  position: fixed;
  left: 30%;

  top: 70px;

  z-index: 50;

  svg {
    width: 40px;
    height: 40px;
    color: #d95f2a;
    cursor: pointer;
  }
`;
