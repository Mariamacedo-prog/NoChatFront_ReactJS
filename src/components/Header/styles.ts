import styled from "styled-components";

export const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #ff4d00;
  margin: -8px;
  position: fixed;
  top: 8px;
  width: 100%;
  z-index: 99;

  img {
    height: 50px;
    width: 50px;
    margin-left: 15px;
  }
  p {
    color: #fff;
  }
`;

export const Search = styled.div`
  border-radius: 10px;
  height: 33px;
  background-color: #19181a;
  display: flex;
  align-items: center;
  margin: 0 10px;
  flex: 1;
  svg {
    margin-right: 10px;
    color: #ff4d00;
    width: 33px;
    height: 27px;
  }
  input {
    background-color: transparent;
    border: none;
    outline: 0;
    color: #ff4d00;
  }
`;

export const Menu = styled.nav`
  width: 40%;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
  }

  li {
    width: 20%;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #19181a;
      justify-content: center;
      text-decoration: none;
      svg {
        height: 30px;
        width: 30px;
        transition: 0.5s;
      }
      p {
        margin: 0;
        padding: 0;
        color: #19181a;
        font-size: 16px;
        font-weight: bolder;
      }
      img {
        border-radius: 50%;
        height: 30px;
        width: 30px;
      }
    }
    a:hover {
      color: #fff;
    }
  }
`;

export const Button = styled.button`
  height: 60px;
  width: 20%;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
  transition: 0.5s;
  color: #19181a;

  :hover {
    color: #fff;
  }
  svg {
    height: 20px;
    width: 20px;
  }
`;
