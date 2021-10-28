import React from "react";
import * as C from "./styles";

type ModalType = {
  open: boolean;
  children: any;
  onClose: () => void;
};

const Modal = (props: ModalType) => {
  if (!props.open) return null;

  return (
    <>
      <C.Position onClick={props.onClose} />
      <C.Container>{props.children}</C.Container>
    </>
  );
};
export default Modal;
