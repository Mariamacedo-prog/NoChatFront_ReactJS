import React from "react";
import { PublicationsType } from "../../reducers/UserReducer";
import { Container, DescriptionArea, PostInfo } from "./styles";
import { Link } from "react-router-dom";

interface PublicationProps {
  item: PublicationsType;
  userTitle: string;
  avatar: string;
}

const Publication: React.FC<PublicationProps> = (props) => {
  return (
    <>
      <PostInfo>
        {props.avatar !== "" ? (
          <img
            src={`${props.avatar}`}
            alt={`foto de perfil de ${props.userTitle}`}
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Avatar"
          />
        )}
        <Link to={`/user/${props.userTitle}`}>{props.userTitle}</Link>
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

export default Publication;
