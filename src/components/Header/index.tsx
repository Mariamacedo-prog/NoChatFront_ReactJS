import React from "react";
import { Link } from "react-router-dom";

import { isLogged, doLogout } from "../../helpers/Auth";

const Header = () => {
  let logged = isLogged();

  const hadleLogout = () => {
    doLogout();
    window.location.href = "/";
  };
  return (
    <div>
      <div>esse é o menu...</div>
      <button onClick={hadleLogout}>Sair</button>
    </div>
  );
};

export default Header;
