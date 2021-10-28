import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PublicationsType } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import useApi from "../../helpers/Api";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as C from "./styles";

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

  useEffect(() => {
    if (errors !== "") {
      toast.error(errors, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errors]);

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
    <C.Container>
      {errors !== "" && (
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
        />
      )}
      {!available && <C.DescriptionArea>ARTIGO DELETADO</C.DescriptionArea>}
      {available && (
        <>
          <C.PostInfo>
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
          </C.PostInfo>

          <C.ArticleArea>
            <div>
              <C.Title>{props.item.title}</C.Title>
              <Link to={`/post/${props.item._id}`}>
                <C.DescriptionArea>{props.item.description}</C.DescriptionArea>
              </Link>
            </div>
            <small>...</small>
          </C.ArticleArea>
        </>
      )}
    </C.Container>
  );
};

const mapStateToProps = (state: any) => {
  return {
    _id: state.user._id,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
