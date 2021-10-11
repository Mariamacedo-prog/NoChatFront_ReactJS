import styled from "styled-components";

export const Container = styled.div`
  width: 530px;
  height: calc(100% - 60px);
  position: fixed;
  top: 68px;
  display: flex;
  background-color: #19181a;
  margin: -8px;
  border-right: 4px solid #ff4d00;

  .opend {
    margin-left: 0px;
  }

  .closed {
    margin-left: -530px;
  }

  @media (max-width: 1050px) {
    width: 330px;
  }

  @media (max-width: 650px) {
    width: 330px;
  }
`;
export const ListChatItem = styled.li`
  display: flex;
  width: 495px;
  margin-left: -20px;
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
`;
export const ListChatContainer = styled.ul`
  overflow-y: scroll;
  list-style: none;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
  }
`;
export const ChatConversarion = styled.div`
  width: 530px;
  height: calc(100% - 60px);
  position: fixed;
  margin: 0px;
  top: 55px;
  display: flex;
  background-color: #19181a;
  transition: all ease 1s;
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
`;

export const ChatContainter = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 0;
  margin: 0;
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
`;
export const MessageItem = styled.li`
  display: flex;
  border-radius: 7px;
  margin: 5px 10px;
  p {
    word-wrap: break-word;
    max-width: 240px;
    font-weight: bolder;
  }
  small {
    color: #ddd;
    align-self: flex-end;
  }
`;
export const InputMessageArea = styled.div`
  margin: 20px;
`;
