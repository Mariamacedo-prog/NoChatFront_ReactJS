import React from "react";
import { PublicationsType } from "../../reducers/UserReducer";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { Container, DescriptionArea, PostInfo } from "./styles";

interface PublicationProps {
  item: PublicationsType;
  _id: string;
}

const Publication: React.FC<PublicationProps> = (props) => {
  return (
    <>
      {props.item.userId === props._id && <AiFillDelete />}
      <PostInfo>
        {props.item.avatar ? (
          <img
            src={props.item.avatar}
            alt={`foto de perfil de ${props.item.username}`}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        )}
        <Link to={`/user/${props.item.username}`}>{props.item.username}</Link>
      </PostInfo>
      <DescriptionArea>{props.item.description}</DescriptionArea>
      {props.item.image && (
        <Container>
          <Link to={`/post/${props.item._id}`}>
            <img src={props.item.image} alt="imagem" />
          </Link>
        </Container>
      )}
    </>
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

export default connect(mapStateToProps, mapDispachToProps)(Publication);
