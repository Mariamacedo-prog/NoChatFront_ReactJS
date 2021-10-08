import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useApi from "../../helpers/Api";
import Button from "../../components/Button";
import Error from "../../components/Error";
import { PublicationsType } from "../../reducers/UserReducer";
import {
  ButtonsArea,
  PublicationImage,
  Leftside,
  Rightside,
  CommentList,
  CommentItem,
  DescriptionArea,
  ContentArea,
  TitleArea,
  PostInfo,
} from "./styles";

interface PropsData {
  _id: string;
}

const PagePublication = (props: PropsData) => {
  const api = useApi();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [publication, setPublication] = useState({} as PublicationsType);
  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false);
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [comment, setComment] = useState(false);

  useEffect(() => {
    const getItem = async () => {
      const json = await api.getPublicationItem(id);
      if (json.error) {
        history.push("/notfound");
      } else {
        setPublication(json);
      }
      setLoading(false);
    };
    getItem();
  }, [api, id, comment, like]);

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

  const handleDate = (date: string) => {
    const newDate = new Date(date);
    const day = `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
    const minutes =
      newDate.getMinutes() < 10
        ? `0${newDate.getMinutes()}`
        : newDate.getMinutes();
    const time = `${newDate.getHours()}:${minutes}`;

    return `${day}  ${time}`;
  };

  const handleComment = async (id: string) => {
    setErrors("");
    const json = await api.createComment(msg, id);

    if (json.error) {
      setErrors(json.error);
    } else {
      setMsg("");
      comment === true ? setComment(false) : setComment(true);
      return json;
    }
  };
  const deleteComment = async (id: string) => {
    setErrors("");
    const json = await api.deleteComment(id);

    if (json.error) {
      setErrors(json.error);
    } else {
      comment === true ? setComment(false) : setComment(true);
      return json;
    }
  };

  return (
    <ContentArea>
      {publication.image && publication.category !== "article" && (
        <Leftside>
          <PublicationImage
            src={publication.image}
            alt={`publicação de ${publication.username}`}
          />
        </Leftside>
      )}

      {loading && <p>Loading...</p>}

      <Rightside className={!publication.image ? "noImage" : undefined}>
        {errors !== "" && <Error error={errors} />}
        {publication.description && (
          <DescriptionArea>
            <PostInfo>
              {publication.avatar ? (
                <img
                  src={publication.avatar}
                  alt={`foto de perfil de ${publication.username}`}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Avatar"
                />
              )}
              <Link to={`/user/${publication.username}`}>
                {publication.username}
              </Link>
            </PostInfo>
            {publication.title && <TitleArea>{publication.title}</TitleArea>}
            {publication.description}
          </DescriptionArea>
        )}

        <CommentList>
          {publication.comment &&
            publication.comment.map((comment) => (
              <CommentItem key={comment.id} className={comment.type}>
                <div>
                  {comment.author === props._id && comment.type === "text" && (
                    <AiFillDelete onClick={() => deleteComment(comment.id)} />
                  )}
                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={`Publicação de ${comment.username}`}
                    />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      alt=""
                    />
                  )}
                  <h2>{comment.username}</h2>
                  <small>{handleDate(comment.date)}</small>
                </div>

                <p>{comment.msg}</p>
              </CommentItem>
            ))}
        </CommentList>
        {!loading && publication && (
          <ButtonsArea>
            <Button
              classes={
                publication.like.some((item) => item === props._id)
                  ? "liked"
                  : undefined
              }
              length={publication.like.length}
              handleButton={() => handleLike(publication._id)}
            >
              <AiOutlineHeart />
            </Button>
            <input
              type="text"
              name="password"
              placeholder="Comente..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={() => handleComment(publication._id)}>
              Enviar
            </button>
          </ButtonsArea>
        )}
      </Rightside>
    </ContentArea>
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

export default connect(mapStateToProps, mapDispachToProps)(PagePublication);