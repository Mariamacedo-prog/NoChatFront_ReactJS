import styled from "styled-components";

export const ContentArea = styled.div`
  display: flex;
  background-color: #272727;
  margin-top: 60px;
  height: calc(100vh - 60px);
  color: #fff;
  justify-content: center;
  overflow-y: hidden;
  width: 100%;
  .noImage {
    width: 100%;
  }

  svg {
    cursor: pointer;
  }
  .deleted {
    p {
      color: #d95f2a;
    }
  }
  @media (max-width: 750px) {
    margin-top: 92px;
    flex-direction: column;
    height: auto;
  }
`;
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  @media (max-width: 650px) {
    width: auto;
  }
`;
export const PublicationImage = styled.img`
  border-radius: 10px;
  border: 1px solid #d95f2a;
  max-width: 600px;
  height: 100%;
`;
export const RightSide = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
  @media (max-width: 650px) {
    width: auto;
  }
`;
export const CommentList = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d95f2a;
  }
  @media (max-width: 650px) {
    flex: 0;
    max-height: 200px;
  }
`;
export const CommentItem = styled.li`
  display: block;
  flex-direction: column;
  padding: 10px;
  border-bottom: 0.5px solid #000;

  div {
    display: flex;
    align-items: center;

    a {
      font-size: medium;
      margin: 0;
      padding: 0;
      flex: 1;
      margin-left: 5px;
      text-decoration: none;
      color: #fff;
    }
    small {
      font-size: 10px;
    }
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
  }

  p {
    font-size: 15px;
    word-wrap: break-word;
  }
`;
export const DescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  p {
    font-size: larger;
    font-weight: none;
    white-space: pre-wrap;
  }

  padding: 10px 10px 0 10px;
  max-height: 60%;
  font-size: 12px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d95f2a;
  }
`;
export const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  margin-top: 10px;
  background-color: #000;
  border-radius: 10px;
  border: 1px solid #d95f2a;

  input {
    flex: 1;
    border: none;
    padding-left: 20px;
    color: #fff;
    margin: 3px 0;
    outline: none;
    background-color: #000;
  }

  .sendButton {
    color: #fff;
    margin: 10px;
  }
  @media (max-width: 1050px) {
    input {
      width: 100%;
    }
  }
`;
export const TitleArea = styled.h1`
  font-family: "Courier New", Courier, monospace;
  color: #d95f2a;
  margin: 3px 0;
`;
export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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
