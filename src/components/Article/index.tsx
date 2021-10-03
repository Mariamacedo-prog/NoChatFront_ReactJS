import React from "react";
import { PublicationsType } from "../../reducers/UserReducer";
import {
  Container,
  DescriptionArea,
  PostInfo,
  ArticleArea,
  Title,
  ContainerImage,
} from "./styles";
import { Link } from "react-router-dom";

interface ArticleProps {
  item: PublicationsType;
  userTitle: string;
  avatar: string;
}

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <Container>
      <PostInfo>
        <div>
          {props.avatar !== "" ? (
            <img
              className="userImage"
              src={`${props.avatar}`}
              alt={`foto de perfil de ${props.userTitle}`}
            />
          ) : (
            <img
              className="userImage"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
            />
          )}
          <Link to={`/user/${props.userTitle}`}>{props.userTitle}</Link>
        </div>
        {props.item.image && (
          <ContainerImage>
            <Link to={`/post/${props.item._id}`}>
              <img
                className="articleImage"
                src={props.item.image}
                alt="imagem"
              />
            </Link>
          </ContainerImage>
        )}
      </PostInfo>
      <ArticleArea>
        <Title>{props.item.title}</Title>
        <Link to={`/post/${props.item._id}`}>
          <DescriptionArea>{props.item.description}</DescriptionArea>
        </Link>
      </ArticleArea>
    </Container>
  );
};

export default Article;
