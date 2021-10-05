import React from "react";
import { Container } from "./styles";
import Image404 from "../../assets/404.png";

const NotFound = () => {
  return (
    <Container>
      <img src={Image404} alt="Pagina não encontrada" />
    </Container>
  );
};
export default NotFound;
