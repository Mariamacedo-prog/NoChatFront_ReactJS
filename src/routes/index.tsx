import { Switch } from "react-router-dom";
import Route from "./Routehandler";

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <div>Opaaa privado</div>
    </Route>
    <Route exact path="/signin">
      <div>Opaaa publico</div>
    </Route>
  </Switch>
);

export default Routes;
