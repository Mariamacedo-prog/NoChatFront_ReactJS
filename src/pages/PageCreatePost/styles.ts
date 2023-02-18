import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #272727;
  height: calc(100vh - 60px);
  margin-top: 60px;
  width: 100%;
  color: #fff;
`;

export const Form = styled.form`
  margin-top: 30px ;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 24px 4px;
  max-height: 400px;
  background-color: #161617;
  svg {
    width: 40px;
    height: 40px;
    background-color: #161617;
    color: #d83600;
    position: absolute;
    cursor: pointer;
    border-radius: 3px;
  }
  .LabelFile {
    width: 190px;
    margin-bottom: 10px;
  }
  select {
    background-color: #d83600;
    height: 30px;
    margin-bottom: 10px;
    width: 220px;
    transition: 0.5s;
    color: #fff;
    border: 3px solid #d83600;
    ::placeholder {
      color: #fff;
    }
    :focus {
      border: 3px solid #272727;
      outline: 0;
    }
  }
  p {
    font-size: 12px ;
    margin: 10px ;
    padding: 10px;
    color: red;
  }

  label{
    display:flex;
    .pictureSvg{
      margin-top:-3px ;
      width: 50px;
      height: 50px;
    }
  }
`;

export const Description = styled.textarea`
  background-color: #d83600;
  height: 100px;
  margin-bottom: 10px;
  width: 450px;
  border-radius: 5px;
  transition: 0.5s;
  color: #fff;
  border: 3px solid #d83600;
  white-space: pre-wrap;
  ::placeholder {
    color: #fff;
  }
  :focus {
    border: 3px solid #272727;
    outline: 0;
  }
  @media (max-width: 650px) {
    width: 300px;
  }
`;
export const Title = styled.h1`
  color: #fff;
  font-size: 12px;
  padding: 5px;
`;
export const CreateButton = styled.button`
  color: #fff;
  font-size: larger;
  font-weight: bolder;
  background-color: #161617;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s;
  height: 30px;
  width: 100%;
  border: 2px solid #fff;

  :hover {
    color: #d83600;
    border: 2px solid #d83600;
  }
`;

export const InputFile = styled.input`
  width: 50px;
  height: 50px;
  color: transparent;
`;

export const Input = styled.input`
  background-color: #d83600;
  height: 30px;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 5px;
  transition: 0.5s;
  color: #fff;
  border: 3px solid #d83600;

  ::placeholder {
    color: #fff;
  }
  :focus {
    border: 3px solid #272727;
    outline: 0;
  }
`;


export const UserDiv = styled.div`
  margin: 10px ;
  margin-left: 0;
  display: flex;
  align-items:center ;
  width: 100%;
  img{
    height: 40px;
    width: 40px;
    border-radius: 50% ;
  }
  p{
    display: flex;
    flex-direction: column;
    margin-left:20px;
    color :  #FFFF;
    font-weight: bold;
    .inputCategory{
      border-radius: 5px;
      background-color: #d83600;
      height: 30px;
      margin-top: 5px;
      font-size: 12px;
      width: 90px;
      color: #fff;
    }
  }
`;