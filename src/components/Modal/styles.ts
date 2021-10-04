import styled from "styled-components";

export const Position = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: #19181a;
  opacity: 0.8;
`;
export const Container = styled.div`
  position: fixed;
  left: 100px;
  top: 70px;

  z-index: 50;

  svg {
    width: 40px;
    height: 40px;
    color: #ff4d00;
    cursor: pointer;
  }
`;
