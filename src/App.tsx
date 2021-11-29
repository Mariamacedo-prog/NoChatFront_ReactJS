import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { isLogged } from "./helpers/Auth";
import Routes from "./routes";
import Header from "./components/Header";
import Chat from "./components/Chat";
import "./App.css";

const App = () => {
  let logged = isLogged();
  const [openChat, setOpenChat] = React.useState(false);

  return (
    <Router>
      {logged && <Header openChat={openChat} setOpenChat={setOpenChat} />}
      <div id="page">
        {logged && openChat && <Chat />}
        <Routes />
      </div>
    </Router>
  );
};

export default App;
