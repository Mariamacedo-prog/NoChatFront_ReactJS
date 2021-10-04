import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;
export const ContainerImage = styled.div`
  display: flex;
  justify-content: center;
  background-color: #000;
  border-radius: 15px;
  padding: 10px;
  margin-top: 20px;

  .articleImage {
    height: 100px;
    width: 100px;
  }
`;
export const DescriptionArea = styled.div`
  width: 350px;
  font-size: small;
  margin: 10px;
  font-family: "Courier New", Courier, monospace;
`;
export const PostInfo = styled.div`
  div {
    display: flex;
    align-items: center;
  }
  .userImage {
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
export const ArticleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  a {
    color: #fff;
    text-decoration: none;
  }
`;
export const Title = styled.h2`
  padding: 0;
  margin: 0 10px;
  color: #ff8855;
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
`;
