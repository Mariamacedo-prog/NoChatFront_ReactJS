import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { PublicationsType } from "../../reducers/UserReducer";
import { Container, DescriptionArea } from "./styles";
import { Link } from "react-router-dom";

interface PublicationProps {
  item: PublicationsType;
  loggedUserId: string;
}

const Publication: React.FC<PublicationProps> = (props) => {
  return (
    <>
      <DescriptionArea>{props.item.description}</DescriptionArea>
      <Container>
        <Link to={`/post/${props.item._id}`}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="imagem"
          />
        </Link>
      </Container>
    </>
  );
};
const mapStateToProps = (state: any) => {
  return {
    loggedUserId: state.user._id,
  };
};

const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Publication);
