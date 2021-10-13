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
  align-items: center;
  justify-content: center;
  img {
    max-height: 350px;
    max-width: 350px;
    border-radius: 15px;
  }
  @media (max-width: 650px) {
    height: 300px;
    width: 300px;

    img {
      max-height: 300px;
      max-width: 300px;
    }
  }
`;

export const DescriptionArea = styled.div`
  width: 350px;
  font-size: small;
  margin: 10px;
  @media (max-width: 650px) {
    width: 300px;
  }
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
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

  small {
    font-size: x-small;
  }
  @media (max-width: 650px) {
    width: 300px;
  }
`;
