import React from "react";
import { PublicationsType } from "../../reducers/UserReducer";
import {
  Container,
  DescriptionArea,
  PostInfo,
  ArticleArea,
  Title,
  ContainerImage,
  ImagePlace,
} from "./styles";
import { Link } from "react-router-dom";

interface ArticleProps {
  item: PublicationsType;
}

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <Container>
      <PostInfo>
        <div>
          {props.item.avatar ? (
            <img
              className="userImage"
              src={props.item.avatar}
              alt={`foto de perfil de ${props.item.username}`}
            />
          ) : (
            <img
              className="userImage"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Avatar"
            />
          )}
          <Link to={`/user/${props.item.username}`}>{props.item.username}</Link>
        </div>
      </PostInfo>

      <ArticleArea>
        <ImagePlace>
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
        </ImagePlace>
        <div>
          <Title>{props.item.title}</Title>
          <Link to={`/post/${props.item._id}`}>
            <DescriptionArea>{props.item.description}</DescriptionArea>
          </Link>
        </div>
      </ArticleArea>
    </Container>
  );
};

export default Article;
