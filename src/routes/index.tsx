import { Switch, Redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Feed from "../pages/Feed";
import { isLogged } from "../helpers/Auth";
import Route from "./Routehandler";
import Chat from "../components/Chat";

let logged = isLogged();

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/signin" public>
      {!logged ? <SignIn /> : <Redirect to="/" />}
    </Route>
    <Route exact path="/signup" public>
      {!logged ? <SignUp /> : <Redirect to="/" />}
    </Route>
    <Route exact path="/" private>
      <div>
        <Chat />
        <Feed />
      </div>
    </Route>

    <Route>
      <div>PAGINA NAO ENCONTRADA</div>
    </Route>
  </Switch>
);

export default Routes;
