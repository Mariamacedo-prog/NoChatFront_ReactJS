import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  height: 350px;
  width: 350px;
  margin: 10px;
  color: #fff;
  border-radius: 15px;

  img {
    width: 100%;
    border-radius: 15px;
  }
`;

export const DescriptionArea = styled.div`
  width: 350px;
  font-size: small;
  margin: 10px;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 10px;
  }
  a {
    font-size: 14px;
    text-decoration: none;
    color: #fff;
  }
`;
