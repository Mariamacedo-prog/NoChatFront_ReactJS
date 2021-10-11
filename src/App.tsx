import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { isLogged } from "./helpers/Auth";
import Routes from "./routes";
import Header from "./components/Header";

const App = () => {
  let logged = isLogged();
  return (
    <Router>
      {logged && <Header />}
      <Routes />
    </Router>
  );
};

export default App;
