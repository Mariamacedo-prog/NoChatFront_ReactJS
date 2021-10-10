import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { PublicationsType } from "../../reducers/UserReducer";
import { Dispatch } from "redux";
import Publication from "../../components/Publication";
import Article from "../../components/Article";
import Button from "../../components/Button";
import useApi from "../../helpers/Api";
import Error from "../../components/Error";
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
} from "./styles";

const PageUser = (props: any) => {
  const api = useApi();
  const { name } = useParams<{ name: string }>();
  const [category, setCategory] = useState("publication");
  const [publications, setPublications] = useState([]);
  const [user, setUser] = useState({} as any);
  const [like, setLike] = useState(false);
  console.log(user);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setErrors("");
    const getUser = async () => {
      const json = await api.getOneUser(name);

      if (json.error) {
        setErrors(json.error);
        setLoading(false);
      } else {
        setUser(json.user);
        setPublications(json.publications);
        setLoading(false);
      }
    };
    getUser();
  }, [api, category, like, name]);

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

  return (
    <>
      <Container>
        <HeaderProfile>
          <ProfileImage>
            {user.avatar ? (
              <img
                src={`${user.avatar}`}
                alt={`foto de perfil de ${user.name}`}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Avatar"
              />
            )}
          </ProfileImage>
          <ProfileInfo>
            <h1> {user.name}</h1>
            <small>{user.email}</small>
            <div>{user.description && <p>{user.description}</p>}</div>
          </ProfileInfo>
          <ProfileConfig>
            <ul>
              {user.followings && (
                <div>
                  <li>{user.followings.length}</li>
                  <li>Seguindo</li>
                </div>
              )}
              {user.followers && (
                <div>
                  <li>{user.followers.length}</li>
                  <li>Seguidores</li>
                </div>
              )}
            </ul>
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
          {errors !== "" && <Error error={errors} />}
          {loading && <p>Loading...</p>}
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
                            handleButton={() => handleLike(item._id)}
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
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(PageUser);