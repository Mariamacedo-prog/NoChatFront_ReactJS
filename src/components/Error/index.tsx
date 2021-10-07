import React from "react";
import { BiErrorAlt } from "react-icons/bi";
import { ErrorArea } from "./styles";

interface PropsData {
  error: string;
}

const Error = (props: PropsData) => {
  return (
    <ErrorArea>
      <BiErrorAlt className="svgError" />
      {props.error}
    </ErrorArea>
  );
};

export default Error;
