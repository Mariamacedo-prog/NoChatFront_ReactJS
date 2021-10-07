import React from "react";
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
      <Container>{props.children}</Container>
    </>
  );
};
export default Modal;
