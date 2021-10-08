import React from "react";
import { Link } from "react-router-dom";
import { PublicationsType } from "../../reducers/UserReducer";
import { connect } from "react-redux";
import { Dispatch } from "redux";
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
}

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <Container>
      {props.item.userId === props._id && <AiFillDelete />}
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

const mapStateToProps = (state: any) => {
  return {
    _id: state.user._id,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Article);
