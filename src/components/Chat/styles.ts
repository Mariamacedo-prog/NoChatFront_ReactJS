import styled from "styled-components";

export const Container = styled.div`
  width: 530px;
  height: calc(100% - 42px);
  position: fixed;
  top: 68px;
  display: flex;
  background-color: #19181a;
  margin: -8px;
  border-right: 4px solid #ff4d00;

  @media (max-width: 1050px) {
    width: 330px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;
