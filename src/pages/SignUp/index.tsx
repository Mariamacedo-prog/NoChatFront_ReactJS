import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineCaretLeft } from "react-icons/ai";
import { RiLockPasswordLine, RiAtLine } from "react-icons/ri";
import useApi from "../../helpers/Api";
import { doLogin } from "../../helpers/Auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as C from "./styles";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    const json = await api.register(email, password, name);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }

    setDisabled(false);
  };

  useEffect(() => {
    if (errors !== "") {
      toast.error(errors, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errors]);

  return (
    <C.Container>
      <C.Background id="backgroundSide" />
      {errors !== "" && (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
        />
      )}
      <C.FormSide>
        <h2>Preencha os dados</h2>

        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username: "
              disabled={disabled}
              maxLength={30}
              required
            />
            <RiAtLine />
          </label>
          <label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail: "
              maxLength={70}
              disabled={disabled}
              required
            />
            <AiOutlineMail />
          </label>

          <label>
            <input
              type="password"
              name="password"
              placeholder="Senha: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
              required
            />
            <RiLockPasswordLine />
          </label>
          <label>
            <button type="submit" disabled={disabled}>
              Cadastrar
            </button>
            <AiOutlineCaretLeft />
          </label>
        </form>
        <div>
          <Link to="/signin">Voltar para o Login!</Link>
        </div>
      </C.FormSide>
    </C.Container>
  );
};
export default SignUp;
