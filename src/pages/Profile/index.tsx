import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GrConfigure } from "react-icons/gr";
import { PublicationsType } from "../../reducers/UserReducer";
import { Dispatch } from "redux";
import Publication from "../../components/Publication";
import Article from "../../components/Article";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useApi from "../../helpers/Api";
import Error from "../../components/Error";
import * as C from "./styles";
import {
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";

const Profile = (props: any) => {
  const api = useApi();
  const refFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [category, setCategory] = useState("publication");
  const [publications, setPublications] = useState([]);
  const [like, setLike] = useState(false);
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setErrors("");
    const getUserPublications = async () => {
      const json = await api.getPublications({
        author: props._id,
        cat: category,
        limit: 88,
        sort: "desc",
      });
      if (json.error) {
        setErrors(json.error);
        setLoading(false);
      } else {
        setPublications(json.publications);
        setLoading(false);
      }
    };
    getUserPublications();
  }, [api, category, like, props._id]);

  const handleLike = async (id: string) => {
    setErrors("");
    const json = await api.updateLike(id);

    if (json.error) {
      setErrors(json.error);
    } else {
      if (like !== json.liked) {
        setLike(json.liked);
      } else {
        setLike(!json.liked);
        setLike(json.liked);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");
    let errors: string[] = [];

    if (errors.length === 0) {
      const fData = new FormData();

      if (password !== "") {
        if (password === confirmPassword) {
          fData.append("password", password);
        } else {
          setErrors("Senhas não batem!");
          setDisabled(false);
          return;
        }
      }

      if (name !== "") {
        fData.append("name", name);
      }

      if (description !== "") {
        fData.append("description", description);
      }

      if (email !== "") {
        fData.append("email", email);
      }

      if (refFile.current.files) {
        fData.append("avatar", refFile.current.files[0]);
      }

      const json = await api.editUserInfo(fData);

      if (!json.error) {
        window.location.href = "/";
        return;
      } else {
        setErrors(json.error);
      }
    } else {
      setErrors(errors.join("\n"));
      setName("");
      setEmail("");
    }
    setDisabled(false);
  };

  return (
    <>
      <C.Container>
        <C.HeaderProfile>
          <C.ProfileImage>
            {props.avatar !== "" ? (
              <img
                src={`${props.avatar}`}
                alt={`foto de perfil de ${props.name}`}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Avatar"
              />
            )}
            <C.ProfileConfig>
              <ul>
                <div>
                  <li>{props.followings.length}</li>
                  <li>Seguindo</li>
                </div>

                <div>
                  <li>{props.followers.length}</li>
                  <li>Seguidores</li>
                </div>
              </ul>
              <GrConfigure
                className="svgConfig"
                onClick={() => setOpen(true)}
              />

              <Modal open={open} onClose={() => setOpen(false)}>
                <C.EditForm onSubmit={handleSubmit}>
                  <img
                    src="https://img.icons8.com/color/48/000000/close-window.png"
                    alt="botão de fechar modal"
                    onClick={() => setOpen(false)}
                  />
                  {errors !== "" && <Error error={errors} />}
                  <C.EditTitle>Opções de edição:</C.EditTitle>
                  <label>
                    <C.InputEdition
                      type="text"
                      placeholder="E-mail:"
                      maxLength={70}
                      disabled={disabled}
                      value={email === "" ? props.email : email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    <C.InputEdition
                      type="text"
                      placeholder="UserName:"
                      maxLength={30}
                      disabled={disabled}
                      value={name === "" ? props.name : name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label>
                    <C.InputEdition
                      type="password"
                      placeholder="Senha:"
                      disabled={disabled}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <C.InputEdition
                      type="password"
                      placeholder="Confirme a senha:"
                      disabled={disabled}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </label>
                  <label>
                    <C.DescriptionEdit
                      placeholder={`Escreva aqui sua descrição...`}
                      disabled={disabled}
                      maxLength={100}
                      value={
                        description === "" ? props.description : description
                      }
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </label>
                  <label>
                    <C.InputEdition
                      type="file"
                      disabled={disabled}
                      ref={refFile}
                    />
                  </label>

                  <C.ButtonEdit type="submit" disabled={disabled}>
                    Atualizar perfil
                  </C.ButtonEdit>
                </C.EditForm>
              </Modal>
            </C.ProfileConfig>
          </C.ProfileImage>

          <C.ProfileInfo>
            {props.name && (
              <h1 className={props.name.length > 18 ? "bigName" : undefined}>
                {props.name}
              </h1>
            )}
            {props.email && (
              <small
                className={props.email.length > 30 ? "bigEmail" : undefined}
              >
                {props.email}
              </small>
            )}

            <div>{props.description !== "" && <p>{props.description}</p>}</div>
          </C.ProfileInfo>
        </C.HeaderProfile>
        <C.PostButtons>
          <div
            onClick={() => setCategory("publication")}
            className={category === "publication" ? "selected" : undefined}
          >
            Publicações
          </div>
          <div
            onClick={() => setCategory("picture")}
            className={category === "picture" ? "selected" : undefined}
          >
            Fotos
          </div>
          <div
            onClick={() => setCategory("article")}
            className={category === "article" ? "selected" : undefined}
          >
            Artigos
          </div>
        </C.PostButtons>

        <C.UserFeed>
          {errors !== "" && <Error error={errors} />}
          {loading && <p>Loading...</p>}
          {publications &&
            publications.map(
              (item: PublicationsType) =>
                item.category === category && (
                  <C.PostItem key={item._id}>
                    {item.category === "publication" && (
                      <>
                        <Publication item={item} />
                        <C.ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => handleLike(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                          <Button>
                            <AiOutlineShareAlt />
                          </Button>
                        </C.ButtonsArea>
                      </>
                    )}
                    {item.category === "article" && (
                      <>
                        <Article item={item} />
                        <C.ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => handleLike(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                          <Button>
                            <AiOutlineShareAlt />
                          </Button>
                        </C.ButtonsArea>
                      </>
                    )}

                    {item.category === "picture" && (
                      <>
                        <Publication item={item} />
                        <C.ButtonsArea className="picture">
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => handleLike(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                        </C.ButtonsArea>
                      </>
                    )}
                  </C.PostItem>
                )
            )}
        </C.UserFeed>
      </C.Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    email: state.user.email,
    _id: state.user._id,
    description: state.user.description,
    avatar: state.user.avatar,
    chats: state.user.chats,
    followers: state.user.followers,
    followings: state.user.followings,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setNameRedux: (name: string) =>
      dispatch({
        type: "SET_NAME",
        payload: name,
      }),
    setEmailRedux: (email: string) =>
      dispatch({
        type: "SET_EMAIL",
        payload: email,
      }),
    setDescriptionRedux: (description: string) =>
      dispatch({
        type: "SET_DESCRIPTION",
        payload: description,
      }),
    setAvatarRedux: (avatar: string) =>
      dispatch({
        type: "SET_AVATAR",
        payload: avatar,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
