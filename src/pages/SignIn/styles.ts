import styled, { keyframes } from "styled-components";
import NoChat from "../../assets/nochat2.jpg";

const appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;

  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: #000;
  margin: -8px;
`;

export const FormSide = styled.div`
  width: 55%;
  padding: 20px 0;
  background-color: #ff4d00;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  h2 {
    font-size: 50px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    animation: ${appear} 2s;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    animation: ${appear} 3s;

    input {
      background-color: #000;
      border: 1px solid #000;
      height: 30px;
      margin-bottom: 10px;
      width: 290px;
      border-radius: 5px;
      transition: 0.5s;
      color: #fff;
      border: 3px solid #000;
    }
    svg {
      margin-right: 10px;
      color: #fff;
    }
    input::placeholder {
      color: #fff;
    }

    input:focus {
      border: 3px solid #d83600;
      outline: 0;
    }

    button {
      height: 30px;
      width: 300px;
      background-color: #d83600;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.5s;
    }

    button:hover {
      background-color: #a62a00;
    }
  }

  div {
    animation: ${appear} 3s;
    text-align: center;
    p {
      font-weight: bolder;
      margin: 0;
      padding: 0;
    }

    a {
      font-weight: bolder;
      margin: 0;
      padding: 0;
      color: #fff;
      transition: 0.5s;
    }
    a:hover {
      color: #a62a00;
    }
  }
`;

export const Background = styled.div`
  animation: ${appear} 2s;
  flex: 1;
  padding: 20px;
  background: url(${NoChat}) no-repeat center;
  background-size: cover;
`;

export const ErrorSignin = styled.div`
  height: 18px;
  width: 295px;
  background-color: #fff;
  color: #ff0000;
  font-weight: bolder;
  margin-left: 25px;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  svg {
    margin-right: 5px;
  }
`;
