import React from "react";
import {
  Route,
  Redirect,
  RouteProps as ReactDOMRouteProps,
} from "react-router-dom";
import { isLogged } from "../helpers/Auth";

interface RouteProps extends ReactDOMRouteProps {
  private?: boolean;
}

const RouteHandler: React.FC<RouteProps> = ({ children, ...rest }) => {
  let logged = isLogged();
  let authorized = rest.private && !logged ? false : true;

  return (
    <Route
      {...rest}
      render={() => (authorized ? children : <Redirect to="/signin" />)}
    />
  );
};
export default RouteHandler;
