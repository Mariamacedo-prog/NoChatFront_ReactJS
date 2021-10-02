import { Switch, Redirect } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import { isLogged } from "../helpers/Auth";
import Route from "./Routehandler";

const Routes: React.FC = () => {
  let logged = isLogged();
  return (
    <Switch>
      <Route exact path="/signin" public>
        {!logged ? <SignIn /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/signup" public>
        {!logged ? <SignUp /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/profile" private>
        <Profile />
      </Route>

      <Route exact path="/" private>
        <p>algumacoisa</p>
      </Route>
      <Route>
        <div>PAGINA NAO ENCONTRADA</div>
      </Route>
    </Switch>
  );
};

export default Routes;
