import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PublicationsType } from "../../reducers/UserReducer";
import Error from "../../components/Error";
import useApi from "../../helpers/Api";
import { AiFillPicture } from "react-icons/ai";
import {
  Container,
  Title,
  Form,
  CreateButton,
  Description,
  InputFile,
  Input,
} from "./styles";

const PageCreatePost = (props: any) => {
  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [category, setCategory] = useState("publication");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const api = useApi();
  const refFile = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");

    let errors: string[] = [];
    if (errors.length === 0) {
      const fData = new FormData();
      fData.append("category", category);

      if (category === "publication" || category === "picture") {
        if (description.length < 401) {
          fData.append("description", description);
        } else {
          setErrors("Ultrapassou o máximo de caracteres!(400)");
          setDisabled(false);
          return;
        }

        if (refFile.current.files) {
          fData.append("image", refFile.current.files[0]);
        }
      }

      if (category === "article") {
        if (title.length < 71) {
          fData.append("title", title);
        } else {
          setErrors("Titulo ultrapassou o máximo de caracteres!(70)");
          setDisabled(false);
          return;
        }

        if (description !== "") {
          fData.append("description", description);
        } else {
          setErrors("Necessário conteúdo no artigo!");
          setDisabled(false);
          return;
        }
      }

      const json = await api.createPost(fData);

      if (!json.error) {
        window.location.href = "/";
        return;
      } else {
        setErrors(json.error);
      }
    } else {
      setErrors(errors.join("\n"));
    }
    setDisabled(false);
  };
  return (
    <>
      <Container>
        {errors !== "" && <Error error={errors} />}
        <Form onSubmit={handleSubmit}>
          <label>
            <Title>Categoria: </Title>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="publication">Publicação</option>
              <option value="picture">Foto</option>
              <option value="article">Artigo</option>
            </select>
          </label>
          {category === "article" && (
            <p> * Titulo e descrição são itens obrigatórios!</p>
          )}
          {category === "picture" && (
            <p> * Foto e descrição são itens obrigatório!</p>
          )}
          {category === "publication" && (
            <p> * Descrição é obrigatória! Foto é opcional...</p>
          )}
          {category !== "article" && (
            <label className="LabelFile">
              <Title>Escolha uma imagem: </Title>
              <AiFillPicture />
              <InputFile
                type="file"
                disabled={disabled}
                required={category === "picture" ? true : undefined}
                ref={refFile}
              />
            </label>
          )}
          {category === "article" && (
            <label>
              <Title>Título: </Title>
              <Input
                type="text"
                placeholder="Digite o título do artigo:"
                maxLength={70}
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            <Title>Descrição: </Title>
            <Description
              placeholder={`Escreva aqui sua descrição...`}
              disabled={disabled}
              maxLength={category !== "article" ? 400 : undefined}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <CreateButton type="submit" disabled={disabled}>
            POSTAR
          </CreateButton>
        </Form>
      </Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    email: state.user.email,
    _id: state.user._id,
  };
};
const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(PageCreatePost);
