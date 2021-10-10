import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #19181a;
  margin: 60px -8px -8px 525px;
  height: 100%;
  min-height: calc(100vh - 60px);
  color: #fff;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
  svg {
    width: 40px;
    height: 40px;
    background-color: #19181a;
    color: #d83600;
    position: absolute;
    cursor: pointer;
    border-radius: 3px;
  }
  .LabelFile {
    width: 190px;
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
      border: 3px solid #19181a;
      outline: 0;
    }
  }
  p {
    color: #d83600;
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
    border: 3px solid #19181a;
    outline: 0;
  }
`;
export const Title = styled.h1`
  color: #fff;
  font-size: larger;
  font-weight: bolder;
`;
export const CreateButton = styled.button`
  color: #19181a;
  font-size: larger;
  font-weight: bolder;
  background-color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s;
  height: 30px;
  width: 220px;
  border: 2px solid #fff;

  :hover {
    color: #d83600;
    border: 2px solid #d83600;
  }
`;

export const InputFile = styled.input`
  width: 30px;
  height: 30px;
  color: transparent;
`;

export const Input = styled.input`
  background-color: #d83600;
  height: 30px;
  margin-bottom: 10px;
  width: 220px;
  border-radius: 5px;
  transition: 0.5s;
  color: #fff;
  border: 3px solid #d83600;

  ::placeholder {
    color: #fff;
  }
  :focus {
    border: 3px solid #19181a;
    outline: 0;
  }
`;