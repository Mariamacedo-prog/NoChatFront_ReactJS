import React from "react";
import * as C from "./styles";

interface ButtonData {
  handleButton?: () => void;
  classes?: string | undefined;
  length?: number;
  children?: any;
}

const Button = (props: ButtonData) => {
  return (
    <C.Container>
      <C.ButtonArea onClick={props.handleButton} className={props.classes}>
        {props.children}
        {props.length}
      </C.ButtonArea>
    </C.Container>
  );
};

export default Button;
