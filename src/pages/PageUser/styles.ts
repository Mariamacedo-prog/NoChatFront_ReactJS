import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #19181a;
  margin: 60px -8px -8px -8px;
  height: 100%;
  min-height: calc(100vh - 60px);
  color: #fff;
  width: 100%;
`;
export const HeaderProfile = styled.div`
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 10px;
  height: 200px;
  @media (max-width: 650px) {
    height: 150px;
  }
`;
export const ProfileImage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    padding: 10px;
    height: 70px;
    width: 70px;
    border-radius: 50%;
    margin-left: 10px;
  }
  @media (max-width: 650px) {
    img {
      height: 40px;
      width: 40px;
      padding: 0;
    }
  }
`;
export const ProfileInfo = styled.div`
  flex: 1;
  margin-left: 10px;
  h1 {
    font-size: larger;
    outline: none;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
  }
  small {
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
  }
  div {
    height: 80px;
    width: 300px;

    p {
      font-size: 12px;
    }
  }
  .bigEmail {
    font-size: xx-small;
  }

  @media (max-width: 650px) {
    padding: 3px;
    margin-top: -10px;
    h1 {
      font-size: medium;
    }
    .bigName {
      font-size: small;
    }
    small {
      font-size: small;
      word-wrap: break-word;
      width: 100px;
    }
    .bigEmail {
      font-size: 9px;
    }
    div {
      height: 100px;
      width: 200px;

      p {
        font-size: 10px;
      }
    }
  }
`;
export const ProfileConfig = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;

  ul {
    display: flex;
    list-style: none;
  }

  li {
    padding: 5px;
  }

  .svgConfig {
    background-color: #ff4d00;
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
  @media (max-width: 650px) {
    li {
      font-size: xx-small;
    }
  }
`;
export const PostButtons = styled.div`
  height: 30px;
  background-color: #ff4d00;
  margin: 0 10px;
  display: flex;
  color: #19181a;
  justify-content: space-around;
  font-size: x-large;
  text-align: center;
  font-weight: bolder;
  -webkit-touch-callout: none; /* iPhone OS, Safari */
  -webkit-user-select: none; /* Chrome, Safari 3 */
  -khtml-user-select: none; /* Safari 2 */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */
  user-select: none;

  div {
    cursor: pointer;
    width: 34%;
    transition: all ease 0.5s;
  }
  .selected {
    background-color: #19181a;
    color: #ff4d00;
  }
  @media (max-width: 650px) {
    font-size: larger;
  }
`;
export const UserFeed = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  p {
    margin-left: 20px;
    width: 320px;
    font-size: small;
  }
`;
export const PostItem = styled.div`
  border: 5px double #000;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;

  .picture {
    justify-content: space-around;
  }
  svg {
    cursor: pointer;
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
  border: 1px solid #ff4d00;
`;

export const FollowUnfollowButton = styled.div`
  background-color: #ffffff;
  color: #ff4d00;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
`;
