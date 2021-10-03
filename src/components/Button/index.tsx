import React from "react";
import { ButtonArea, Container } from "./styles";

interface ButtonData {
  handleButton?: () => void;
  classes?: string | undefined;
  length?: number;
  children?: any;
}

const Button = (props: ButtonData) => {
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
