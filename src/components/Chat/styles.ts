import styled from "styled-components";

export const Container = styled.div`
  width: 50%;
  height: calc(100vh - 60px);
  background-color: #19181a;
  border-right: 4px solid #ff4d00;
  border-bottom: 4px solid #ff4d00;
  margin-top: 60px;
  .opend {
    margin-left: 0px;
  }

  .closed {
    margin-left: -800px;
  }
  @media (max-width: 650px) {
    width: 100%;
  }
`;
export const ListChatItem = styled.li`
  display: flex;

  height: 60px;
  background-color: #161617;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all ease 1s;
  padding: 5px;
  img {
    padding: 0 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  div {
    flex: 1;

    h2 {
      font-size: medium;
      padding: 0;
      margin: 0;
      color: #ffffff;
    }

    p {
      color: #60574a;
      overflow: hidden;
      position: relative;
      max-width: 350px;
      height: 20px;
    }
    p::before {
      color: #60574a;
      background-color: #161617;
      content: "...";
      position: absolute;
      bottom: -0px;
      right: 0;
    }
  }
  small {
    padding-top: 5px;
    margin-right: 10px;
    color: #ddd;
  }
  &&:hover {
    height: 70px;
    h2 {
      color: #ff4d00;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    p {
      color: #fff;
    }
  }
  @media (max-width: 650px) {
    div {
      p {
        max-width: 180px;
      }
    }
  }
`;
export const ListChatContainer = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  list-style: none;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
  }
  @media (max-width: 650px) {
    height: calc(100% - 60px);
  }
`;
export const ChatConversarion = styled.div`
  width: auto;
  height: calc(100% - 60px);
  position: fixed;
  margin: 0px;
  top: 60px;
  display: flex;
  background-color: #19181a;
  transition: all ease 1s;
  @media (max-width: 650px) {
    width: 100%;
  }
`;
export const BackButton = styled.button`
  color: #ff4d00;
  background-color: #000;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: all ease 0.5s;

  :hover {
    color: #000;
    background-color: #ff4d00;
  }
  @media (max-width: 650px) {
    height: calc(100vh - 60px);
  }
`;
export const ChatContainter = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 650px) {
    height: calc(100vh - 60px);
    width: 100%;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #ff4d00;
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  a {
    margin-left: 10px;
    text-decoration: none;
    color: #fff;
    font-size: large;
    font-weight: bolder;
  }
`;
export const MessagesContainter = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 500px;
  align-items: flex-start;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
  }

  .myMessage {
    color: #000;
    background-color: #ff4d00;
    align-self: flex-end;
  }
  .anotherUserMessage {
    color: #ff4d00;
    background-color: #000;
  }
  @media (max-width: 650px) {
    width: auto;
  }
`;
export const MessageItem = styled.li`
  display: flex;
  border-radius: 7px;
  margin: 5px 10px;
  padding: 10px;
  .deleted {
    color: red;
    font-weight: bolder;
    background-color: #fff;
    padding: 5px;
    border-radius: 4px;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  p {
    margin-left: 10px;
    word-wrap: break-word;
    max-width: 240px;
    font-weight: bolder;
  }
  small {
    color: #ddd;
    align-self: flex-end;
  }
  svg {
    cursor: pointer;
  }
  @media (max-width: 650px) {
    p {
      max-width: 200px;
    }
  }
`;
export const InputMessageArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  margin-top: 10px;
  background-color: #000;
  border-top: 1px solid #ff4d00;

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
    height: 60px;
    background-color: #ff4d00;
    color: #fff;
    border: none;
    margin: 3px;
    border-radius: 2px;
    padding: 3px;
    cursor: pointer;
    transition: 1s;
    :hover {
      background-color: #a62a00;
    }
  }
`;
