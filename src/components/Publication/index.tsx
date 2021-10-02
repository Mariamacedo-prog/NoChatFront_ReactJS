import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

import { Container } from "./styles";
import { PublicationsType } from "../../reducers/UserReducer";
import { Link } from "react-router-dom";

interface PublicationProps {
  item: PublicationsType;
}

const Publication: React.FC<PublicationProps> = (props) => {
  return (
    <Container>
      <Link to={`/post/${props.item._id}`}>
        <img src={props.item.image} alt="imagem" />
        {props.item.category}
        {props.item.description}
        {props.item.like.length}
        {props.item.title && props.item.title}
        {props.item.userId}
      </Link>
      <div>
        <AiOutlineHeart />
        <AiOutlineComment />
        <AiOutlineShareAlt />
      </div>
    </Container>
  );
};
export default Publication;

/*category: "publication"
comment: []
createdAt: "2021-09-29T00:22:04.260Z"
description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with d"
deslike: []
image: "publication8c35cfc8cbf35e17e202ceb7a4952e2d.jpg"
like: []
share: []
updatedAt: "2021-09-29T00:22:04.260Z"
userId: "6151157f4bbd2a30a565abd2"
__v: 0
_id: "6153b1acead11a2d06367c5b"*/
