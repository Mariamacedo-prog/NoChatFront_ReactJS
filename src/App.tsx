import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { isLogged } from "./helpers/Auth";
import Routes from "./routes";
import Header from "./components/Header";
import Chat from "./components/Chat";

const App = () => {
  let logged = isLogged();
  return (
    <Router>
      {logged && (
        <div>
          <Header />
          <div>
            <Chat />
            <Routes />
          </div>
        </div>
      )}
      {!logged && <Routes />}
    </Router>
  );
};

export default App;
