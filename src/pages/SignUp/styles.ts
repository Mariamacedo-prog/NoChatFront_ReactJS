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

const focusAnimation = keyframes`
    0% {
      border: 3px solid #d95f2a;
    }
    50% {
      border: 6px solid #d95f2a;
      background: #272727;
    }
    100% {
      border: 3px solid #d95f2a;
    }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: #272727;
  width: 100%;

  @media (max-width: 650px) {
    #backgroundSide {
      display: none;
    }
  }
`;

export const FormSide = styled.div`
  width: 55%;
  padding: 20px 0;
  background: linear-gradient(to right, #000 3%, #272727 20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  h2 {
    font-size: 50px;
    color: #d95f2a;
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
    animation: ${appear} 3s;

    input {
      background-color: #000;
      padding-left: 15px;
      height: 40px;
      margin-bottom: 10px;
      width: 290px;
      border-radius: 7px 7px 7px 24px;
      transition: 0.5s;
      color: #fff;
      border: 3px solid #272727;
    }
    svg {
      margin-left: 10px;
      color: #d95f2a;
    }

    input:focus {
      border: 3px solid #d95f2a;
      outline: 0;
      animation: ${focusAnimation} 1s;
    }

    button {
      height: 40px;
      width: 284px;
      background-color: #d83600;
      color: #fff;
      border: none;
      cursor: pointer;
      border-radius: 7px 7px 7px 24px;
      transition: 0.5s;
    }
    button:disabled {
      filter: brightness(0.7);
      cursor: wait;
    }

    button:hover {
      filter: brightness(0.7);
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
  @media (max-width: 650px) {
    width: 100%;
    padding: 0;
    background: linear-gradient(to left, #272727 10%, #000 99%);
    h2 {
      font-size: x-large;
    }
  }
`;

export const Background = styled.div`
  width: 45%;
  flex: 1;
  padding: 20px;
  background: url(${NoChat}) no-repeat center;
  background-size: cover;
`;
