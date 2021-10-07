import styled from "styled-components";
import Image404 from "../../assets/404.png";

export const Container = styled.div`
  height: 100vh;
  justify-content: flex-end;
  display: flex;
  margin: -8px;
  background-color: #19181a;
  background-image: url(${Image404});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  img {
    margin-right: 80px;
  }
`;
