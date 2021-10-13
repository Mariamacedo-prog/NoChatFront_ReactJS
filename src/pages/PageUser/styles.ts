import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #19181a;
  margin-top: 60px;
  height: 100%;
  min-height: calc(100vh - 60px);
  color: #fff;
  width: 100%;
`;
export const HeaderProfile = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px;
  height: 150px;
  @media (max-width: 650px) {
    align-items: flex-start;
  }
`;
export const ProfileImage = styled.div`
  img {
    padding: 10px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  @media (max-width: 650px) {
    img {
      height: 60px;
      width: 60px;
    }
  }
`;
export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
    margin-top: 10px;
    height: 80px;
    width: 200px;
    p {
      font-size: 12px;
    }
  }

  @media (max-width: 650px) {
    h1,
    small {
      font-size: smaller;
    }
    img {
      height: 60px;
      width: 60px;
    }
    div {
      height: 100px;
      width: 100px;
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
