import styled from "styled-components";

export const Container = styled.div`
  background-color: #19181a;
  margin: 60px -8px -8px 525px;
  height: calc(100vh - 60px);

  color: #fff;
`;

export const HeaderProfile = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
  height: 150px;
`;

export const ProfileImage = styled.div`
  img {
    height: 100px;
    width: 100px;
  }
`;
export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  div {
    flex: 1;
    height: 60px;
  }
`;
export const ProfileConfig = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;

  div {
    display: flex;
  }

  svg {
    background-color: #ff4d00;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;
