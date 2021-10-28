import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineCaretRight } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import useApi from "../../helpers/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doLogin } from "../../helpers/Auth";
import * as C from "./styles";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    const json = await api.login(email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token);
    }
    window.location.href = "/";

    setDisabled(false);
  };

  return (
    <C.Container>
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
        <h2>NoChat</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <AiOutlineMail />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail: "
              disabled={disabled}
              required
            />
          </label>
          <label>
            <RiLockPasswordLine />
            <input
              type="password"
              name="password"
              placeholder="Senha: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={disabled}
              required
            />
          </label>
          <label>
            <AiOutlineCaretRight />
            <button disabled={disabled}>Entrar</button>
          </label>
        </form>
        <div>
          <p>Não possui uma conta?</p>
          <Link to="/signup">Crie sua conta!</Link>
        </div>
      </C.FormSide>
      <C.Background />
    </C.Container>
  );
};
export default SignIn;
