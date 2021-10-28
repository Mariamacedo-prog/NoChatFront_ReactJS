import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useApi from "../../helpers/Api";
import Button from "../../components/Button";
import Error from "../../components/Error";
import { PublicationsType } from "../../reducers/UserReducer";
import * as C from "./styles";

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
  }, [api, id, comment, like, history]);

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
    const day = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
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
    <C.ContentArea>
      {publication.image && publication.category !== "article" && (
        <C.LeftSide>
          <C.PublicationImage
            src={publication.image}
            alt={`publicação de ${publication.username}`}
          />
        </C.LeftSide>
      )}

      {loading && <p>Loading...</p>}

      <C.RightSide className={!publication.image ? "noImage" : undefined}>
        {errors !== "" && <Error error={errors} />}
        {publication.description && (
          <C.DescriptionArea>
            <C.PostInfo>
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
            </C.PostInfo>
            {publication.title && (
              <C.TitleArea>{publication.title}</C.TitleArea>
            )}
            <p>{publication.description}</p>
          </C.DescriptionArea>
        )}

        <C.CommentList>
          {publication.comment &&
            publication.comment.map((comment) => (
              <C.CommentItem key={comment.id} className={comment.type}>
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
                  <Link to={`/user/${comment.username}`}>
                    {comment.username}
                  </Link>
                  <small>{handleDate(comment.date)}</small>
                </div>

                <p>{comment.msg}</p>
              </C.CommentItem>
            ))}
        </C.CommentList>
        {!loading && publication && (
          <C.ButtonsArea>
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
              name="comment"
              placeholder="Comente..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button onClick={() => handleComment(publication._id)}>
              Enviar
            </button>
          </C.ButtonsArea>
        )}
      </C.RightSide>
    </C.ContentArea>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PagePublication);
