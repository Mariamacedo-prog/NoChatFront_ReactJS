import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineCaretRight } from "react-icons/ai";
import { RiLockPasswordLine, RiErrorWarningLine } from "react-icons/ri";
import useApi from "../../helpers/Api";
import { doLogin } from "../../helpers/Auth";
import { Container, Background, FormSide, ErrorSignin } from "./styles";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState("");

  const api = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    const json = await api.login(email, password);

    if (json.error) {
      setErrors(json.error);
    } else {
      doLogin(json.token);
      window.location.href = "/";
    }
    setDisabled(false);
  };

  return (
    <Container>
      <FormSide>
        <h2>NoChat</h2>
        {errors && (
          <ErrorSignin>
            <RiErrorWarningLine />
            {errors}
          </ErrorSignin>
        )}
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
            <button type="submit" disabled={disabled}>
              Entrar
            </button>
          </label>
        </form>
        <div>
          <p>Não possui uma conta?</p>
          <Link to="/signup">Crie sua conta!</Link>
        </div>
      </FormSide>
      <Background />
    </Container>
  );
};
export default SignIn;
