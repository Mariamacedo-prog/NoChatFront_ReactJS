import styled from "styled-components";
import Image404 from "../../assets/404.png";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  justify-content: flex-end;
  display: flex;
  margin: -8px;
  background-color: #272727;
  background-image: url(${Image404});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
`;
