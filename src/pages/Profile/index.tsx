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
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import {
  Container,
  HeaderProfile,
  ProfileImage,
  ProfileConfig,
  ProfileInfo,
  PostButtons,
  UserFeed,
  PostItem,
  ButtonsArea,
  EditForm,
  ErrorEdit,
  InputEdiction,
  EditTitle,
  DescriptionEdit,
  ButtonEdit,
} from "./styles";

interface EditData {
  name?: string;
  password?: string;
  email?: string;
  description?: string;
  avatar?: any;
}

const Profile = (props: any) => {
  const api = useApi();
  const [category, setCategory] = useState("publication");
  const [publications, setPublications] = useState([]);
  const [like, setLike] = useState(false);
  const [idPubli, setIdPubli] = useState("");
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const refFile = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loadding, setLoadding] = useState(true);

  useEffect(() => {
    const getUserPublications = async () => {
      const json = await api.getPublications({
        author: props._id,
        cat: category,
        limit: 88,
      });
      setPublications(json.publications);
      setLoadding(false);
    };
    getUserPublications();
  }, [api, category, like]);

  useEffect(() => {
    if (idPubli !== "") {
      const getLike = async (idPubli: string) => {
        let id = idPubli;
        const json = await api.updateLike({ id });

        if (like !== json.liked) {
          setLike(json.liked);
          setIdPubli("");
        } else {
          setLike(!json.liked);
          setLike(json.liked);
          setIdPubli("");
        }
      };

      getLike(idPubli);
    }
  }, [api, idPubli]);

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
      <Container>
        <HeaderProfile>
          <ProfileImage>
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
          </ProfileImage>
          <ProfileInfo>
            <h1> {props.name}</h1>
            <small>{props.email}</small>
            <div>{props.description !== "" && <p>{props.description}</p>}</div>
          </ProfileInfo>
          <ProfileConfig>
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
            <GrConfigure onClick={() => setOpen(true)} />
            <Modal open={open} onClose={() => setOpen(false)}>
              <EditForm onSubmit={handleSubmit}>
                {errors && <ErrorEdit>{errors}</ErrorEdit>}
                <EditTitle>Opções de edição:</EditTitle>
                <label>
                  <InputEdiction
                    type="text"
                    placeholder="E-mail:"
                    maxLength={70}
                    disabled={disabled}
                    value={email === "" ? props.email : email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <InputEdiction
                    type="text"
                    placeholder="UserName:"
                    maxLength={30}
                    disabled={disabled}
                    value={name === "" ? props.name : name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label>
                  <InputEdiction
                    type="password"
                    placeholder="Senha:"
                    disabled={disabled}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputEdiction
                    type="password"
                    placeholder="Confirme a senha:"
                    disabled={disabled}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
                <label>
                  <DescriptionEdit
                    placeholder={`Escreva aqui sua descrição...`}
                    disabled={disabled}
                    maxLength={100}
                    value={description === "" ? props.description : description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
                <label>
                  <InputEdiction
                    type="file"
                    disabled={disabled}
                    ref={refFile}
                  />
                </label>

                <ButtonEdit type="submit" disabled={disabled}>
                  Atualizar perfil
                </ButtonEdit>
              </EditForm>
            </Modal>
          </ProfileConfig>
        </HeaderProfile>
        <PostButtons>
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
        </PostButtons>

        <UserFeed>
          {loadding && <p>Loadding...</p>}
          {publications &&
            publications.map(
              (item: PublicationsType) =>
                item.category === category && (
                  <PostItem key={item._id}>
                    {item.category === "publication" && (
                      <>
                        <Publication item={item} />
                        <ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
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
                        </ButtonsArea>
                      </>
                    )}
                    {item.category === "article" && (
                      <>
                        <Article item={item} />
                        <ButtonsArea>
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
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
                        </ButtonsArea>
                      </>
                    )}

                    {item.category === "picture" && (
                      <>
                        <Publication item={item} />
                        <ButtonsArea className="picture">
                          <Button
                            classes={
                              item.like.some((item) => item === props._id)
                                ? "liked"
                                : undefined
                            }
                            length={item.like.length}
                            handleButton={() => setIdPubli(item._id)}
                          >
                            <AiOutlineHeart />
                          </Button>
                          <Button length={item.comment.length}>
                            <Link to={`/post/${item._id}`}>
                              <AiOutlineComment />
                            </Link>
                          </Button>
                        </ButtonsArea>
                      </>
                    )}
                  </PostItem>
                )
            )}
        </UserFeed>
      </Container>
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

const mapDispachToProps = (dispatch: Dispatch) => {
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

export default connect(mapStateToProps, mapDispachToProps)(Profile);
