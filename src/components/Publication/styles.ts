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
    margin: 0 25px;
    width: 300px;
  }
`;

export const DescriptionArea = styled.div`
  width: 350px;
  font-size: small;
  margin: 10px;
`;
