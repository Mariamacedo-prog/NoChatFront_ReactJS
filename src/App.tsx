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
      {logged && <Chat />}
      {logged && <Header />}
      <Routes />
    </Router>
  );
};

export default App;
