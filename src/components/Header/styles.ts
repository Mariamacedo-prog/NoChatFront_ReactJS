import styled from "styled-components";

export const Container = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #161617;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  p {
    color: #fff;
  }

  img {
    height: 50px;
    width: 50px;
    margin-left: 15px;
  }
  @media (max-width: 650px) {
    img {
      height: 40px;
      width: 40px;
    }
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
  max-width: 500px;
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
  @media (max-width: 650px) {
    flex: 0;
    #searchSvg {
      display: none;
    }
    input {
      width: 60px;
    }
  }
`;

export const Menu = styled.nav`
  flex: 2;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    list-style: none;
  }

  li {
    width: 25%;
    align-items: center;
    color: #ff4d00;
    justify-content: center;

    display: flex;
    flex-direction: column;
    a {
      color: #ff4d00;
      text-decoration: none;
    }
    svg {
      height: 30px;
      width: 30px;
      transition: 0.5s;
      cursor: pointer;
    }

    p {
      color: #ff4d00;
      font-size: 16px;
      font-weight: bolder;
    }
    img {
      border-radius: 50%;
      height: 30px;
      width: 30px;
    }
  }
  svg:hover {
    color: #fff;
  }
  #chatMenuButton {
    display: none;
  }

  @media (max-width: 1050px) {
    p {
      display: none;
    }
  }

  @media (max-width: 650px) {
    flex: 1;
    li {
      width: 30%;
      p {
        display: none;
      }
    }
    #homeMenuButton {
      display: none;
    }
    svg:hover {
      color: #ff4d00;
    }
  }
`;

export const Button = styled.button`
  height: 60px;
  width: 300px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 25px;
  font-weight: bolder;
  text-align: center;

  p {
    padding: 0;
    margin: 0;
    color: #ff4d00;

    transition: 0.5s;
  }

  p:hover {
    color: #fff;
  }
  svg {
    height: 20px;
    width: 20px;
  }

  @media (max-width: 650px) {
    width: 100px;
    p {
      font-size: medium;
    }
    svg {
      height: 15px;
      width: 15px;
    }
  }
`;

export const SearchArea = styled.div`
  display: block;
  position: absolute;
  width: 350px;
  height: 350px;
  background-color: #fff;
  top: 60px;
  background-color: #19181a;
  border: 1px solid #161617;
  overflow-y: scroll;
  z-index: 99;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ff4d00;
  }

  div {
    display: flex;
    border-bottom: 1px solid #ff4d00;
  }

  .seachItem {
    display: flex;
    height: 80px;
    width: 345px;
    align-items: center;

    transition: all ease 1s;
    cursor: pointer;
    text-decoration: none;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin: 0 5px;
    }
    p {
      h5 {
        font-size: medium;
      }
      small {
        display: flex;
        font-size: small;
        color: #ccc;
        overflow: hidden;
        max-width: 200px;
        word-wrap: break-word;
      }
    }

    :hover {
      background-color: #ff4d00;
      p {
        color: #19181a;
        font-weight: bolder;
      }
    }
  }

  .buttonNewChat {
    margin-top: 20px;
    margin-left: 5px;
    cursor: pointer;
    transition: all ease 1s;
  }
  .buttonNewChat:hover {
    margin-top: 10px;
  }

  @media (max-width: 650px) {
    width: 300px;
    height: 250px;
    left: 0;

    .seachItem {
      img {
        width: 30px;
        height: 30px;
      }
      p {
        h5 {
          font-size: medium;
        }
        .bigName {
          font-size: smaller;
        }
        small {
          max-width: 180px;
        }
        .bigEmail {
          font-size: x-small;
        }
      }
    }
  }
`;
