import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Container, Position } from "./styles";

type ModalType = {
  open: boolean;
  children: any;
  onClose: () => void;
};

const Modal = (props: ModalType) => {
  if (!props.open) return null;

  return (
    <>
      <Position onClick={props.onClose} />
      <Container>
        <img
          src="https://img.icons8.com/color/48/000000/close-window.png"
          alt="botão de fechar modal"
          onClick={props.onClose}
        />
        {props.children}
      </Container>
    </>
  );
};
export default Modal;
