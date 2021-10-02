import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  margin: 10px;
  height: 350px;
  width: 350px;
  color: #fff;
  border-radius: 15px;
  img {
    height: 300px;
    width: 300px;
  }
  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: -10px;
  }
  svg {
    margin: 0 5px;
    height: 30px;
    width: 30px;
  }
`;
