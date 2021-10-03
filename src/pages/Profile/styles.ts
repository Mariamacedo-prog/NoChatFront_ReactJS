import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #19181a;
  margin: 60px -8px -8px 525px;
  height: 100%;
  color: #fff;
`;
export const HeaderProfile = styled.div`
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 10px;
  height: 150px;
`;
export const ProfileImage = styled.div`
  img {
    padding: 10px;
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
`;
export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  h1 {
    font-size: larger;
    padding: 0;
    margin: 0;
    outline: none;
    -webkit-touch-callout: none; /* iPhone OS, Safari */
    -webkit-user-select: none; /* Chrome, Safari 3 */
    -khtml-user-select: none; /* Safari 2 */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
    user-select: none;
  }
  small {
    padding: 0;
    margin: 0;
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

  svg {
    background-color: #ff4d00;
    border-radius: 50%;
    width: 20px;
    height: 20px;
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
  div:hover {
    background-color: #19181a;
    color: #ff4d00;
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
export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0 10px;
  }
  a {
    font-size: 14px;
    text-decoration: none;
    color: #fff;
  }
`;
export const PostItem = styled.div`
  border: 5px double #000;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
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
