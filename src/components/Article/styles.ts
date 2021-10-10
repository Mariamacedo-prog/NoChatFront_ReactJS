import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DescriptionArea = styled.div`
  width: 350px;
  font-size: small;
  padding: 20px 10px;
  font-family: "Courier New", Courier, monospace;
  overflow: hidden;
  position: relative;
  max-height: 40px;
  text-align: justify;
  :before {
    color: #ff4d00;
    background-color: #19181a;
    content: "...Ver artigo";
    position: absolute;
    bottom: -0px;
    right: 0;
  }
`;
export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
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
  div {
    display: flex;
    align-items: center;
  }
  small {
    font-size: x-small;
  }
`;
export const ArticleArea = styled.div`
  display: flex;
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
  max-width: 350px;
  word-wrap: break-word;
  font-size: larger;
  font-weight: bolder;
  font-family: "Courier New", Courier, monospace;
`;
