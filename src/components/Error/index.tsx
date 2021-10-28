import React from "react";
import { BiErrorAlt } from "react-icons/bi";
import * as C from "./styles";

interface PropsData {
  error: string;
}

const Error = (props: PropsData) => {
  return (
    <C.ErrorArea>
      <BiErrorAlt className="svgError" />
      {props.error}
    </C.ErrorArea>
  );
};

export default Error;
