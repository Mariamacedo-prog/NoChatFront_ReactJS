import React from "react";
import { Link } from "react-router-dom";
import { PublicationsType } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Error from "../../components/Error";
import useApi from "../../helpers/Api";
import { AiFillDelete } from "react-icons/ai";
import {
  Container,
  DescriptionArea,
  PostInfo,
  ArticleArea,
  Title,
} from "./styles";

interface ArticleProps {
  item: PublicationsType;
  _id: string;
  username?: string;
  avatar?: string;
}

const Article: React.FC<ArticleProps> = (props) => {
  const api = useApi();
  const [errors, setErrors] = React.useState("");
  const [available, setAvailable] = React.useState(true);

  const deletePublication = async (id: string) => {
    setErrors("");
    const json = await api.deletePublication({ id });

    if (json.error) {
      setErrors(json.error);
    } else {
      setAvailable(false);
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
  return (
    <Container>
      {errors !== "" && <Error error={errors} />}
      {!available && <DescriptionArea>ARTIGO DELETADO</DescriptionArea>}
      {available && (
        <>
          <PostInfo>
            <div>
              {props.item.userId === props._id && (
                <AiFillDelete
                  onClick={() => deletePublication(props.item._id)}
                />
              )}

              {props.item.avatar ? (
                <img
                  src={props.item.avatar}
                  className="userImage"
                  alt={`foto de perfil de ${props.item.username}`}
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  className="userImage"
                  alt="Avatar"
                />
              )}

              {props.item.username && (
                <Link to={`/user/${props.item.username}`}>
                  {props.item.username}
                </Link>
              )}
            </div>
            {props.item.createdAt && (
              <small>{handleDate(props.item.createdAt)}</small>
            )}
          </PostInfo>

          <ArticleArea>
            <div>
              <Title>{props.item.title}</Title>
              <Link to={`/post/${props.item._id}`}>
                <DescriptionArea>{props.item.description}</DescriptionArea>
              </Link>
            </div>
            <small>...</small>
          </ArticleArea>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    _id: state.user._id,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Article);
