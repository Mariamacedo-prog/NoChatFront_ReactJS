import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #272727;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin: 60px 0 0 0;
  height: 100%;
  width: 100%;
  color: #fff;

  @media (max-width: 750px) {
    margin-top: 92px;
  }
`;

export const UserFeed = styled.div`
  display: flex;

  flex-direction: column;
  padding: 5px;
  p {
    margin-left: 20px;
    width: 320px;
    font-size: small;
  }
`;

export const PostItem = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px double #000;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;

  .picture {
    justify-content: space-around;
  }
`;

export const ButtonsArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  margin: 10px;
  background-color: #000;
  border-radius: 10px;
  border: 1px solid #d95f2a;
`;
