import React, { useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../components/Error";
import { AiOutlineMail, AiOutlineCaretLeft } from "react-icons/ai";
import { RiLockPasswordLine, RiAtLine } from "react-icons/ri";
import useApi from "../../helpers/Api";
import { doLogin } from "../../helpers/Auth";
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

  return (
    <C.Container>
      <C.Background id="backgroundSide" />
      <C.FormSide>
        <h2>Preencha os dados</h2>
        {errors !== "" && <Error error={errors} />}
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
