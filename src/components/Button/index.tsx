import React from "react";
import { ButtonArea, Container } from "./styles";

const Button = (props: any) => {
  return (
    <Container>
      <ButtonArea onClick={props.handleButton} className={props.classes}>
        {props.children}
        {props.length}
      </ButtonArea>
    </Container>
  );
};

export default Button;
