import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineCaretRight } from "react-icons/ai";
import {
  RiLockPasswordLine,
  RiErrorWarningLine,
  RiAtLine,
} from "react-icons/ri";
import useApi from "../../helpers/Api";
import { doLogin } from "../../helpers/Auth";
import { Container, Background, FormSide, ErrorSignin } from "./styles";

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

  return (
    <Container>
      <Background />
      <FormSide>
        <h2>Preencha os dados</h2>
        {errors && (
          <ErrorSignin>
            <RiErrorWarningLine />
            {errors}
          </ErrorSignin>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            <RiAtLine />
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username: "
              disabled={disabled}
              required
            />
          </label>
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
              Cadastrar
            </button>
          </label>
        </form>
        <div>
          <Link to="/signin">Voltar para o Login!</Link>
        </div>
      </FormSide>
    </Container>
  );
};
export default SignUp;
