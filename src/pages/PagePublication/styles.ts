import styled from "styled-components";

export const ContentArea = styled.div`
  display: flex;
  background-color: #19181a;
  margin: 60px -8px -8px 525px;
  height: calc(100vh - 60px);
  color: #fff;
  justify-content: center;
  overflow-y: hidden;
  .noImage {
    width: 100%;
  }

  svg {
    cursor: pointer;
  }
  .deleted {
    p {
      color: #ff4d00;
    }
  }
`;

export const Leftside = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;
export const PublicationImage = styled.img`
  border-radius: 10px;
  border: 1px solid #ff4d00;
`;

export const Rightside = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
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
    background-color: #ff4d00;
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
    h2 {
      font-size: medium;
      margin: 0;
      padding: 0;
      flex: 1;
      margin-left: 5px;
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
  margin: 0;
  p {
    font-size: larger;
    font-weight: none;
  }

  padding: 10px 10px 0 10px;
  max-height: 60%;
  font-size: 12px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
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
  border: 1px solid #ff4d00;

  input {
    flex: 1;
    border: none;
    padding-left: 20px;
    color: #fff;
    margin: 3px 0;
    outline: none;
    background-color: #000;
  }

  button {
    background-color: #ff4d00;
    color: #fff;
    border: none;
    margin: 3px;
    border-radius: 2px;
    padding: 3px;
  }
`;
export const TitleArea = styled.h1`
  font-family: "Courier New", Courier, monospace;
  color: #ff4d00;
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
