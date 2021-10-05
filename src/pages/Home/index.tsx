import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PublicationsType } from "../../reducers/UserReducer";
import Publication from "../../components/Publication";
import Article from "../../components/Article";
import Button from "../../components/Button";
import useApi from "../../helpers/Api";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Container, UserFeed, PostItem, ButtonsArea } from "./styles";

const Home = (props: any) => {
  const api = useApi();
  const [publications, setPublications] = useState([]);
  const [like, setLike] = useState(false);
  const [idPubli, setIdPubli] = useState("");
  const [loadding, setLoadding] = useState(true);
  const [limit, setLimit] = useState(0);
  useEffect(() => {
    const getUserPublications = async () => {
      const json = await api.getPublications({
        limit: limit,
      });
      setPublications(json.publications);
      setLoadding(false);
    };
    getUserPublications();
  }, [api, like, limit]);

  useEffect(() => {
    if (idPubli !== "") {
      const getLike = async (idPubli: string) => {
        let id = idPubli;
        const json = await api.updateLike({ id });

        if (like !== json.liked) {
          setLike(json.liked);
          setIdPubli("");
        } else {
          setLike(!json.liked);
          setLike(json.liked);
          setIdPubli("");
        }
      };

      getLike(idPubli);
    }
  }, [api, idPubli]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLimit((value) => value + 10);
      }
    });

    intersectionObserver.observe(
      document.querySelector("#more") as HTMLElement
    );

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <>
      <Container>
        <UserFeed>
          {loadding && <p>Loadding...</p>}
          {publications &&
            publications.map((item: PublicationsType) => (
              <PostItem key={item._id}>
                {item.category === "publication" && (
                  <>
                    <Publication item={item} />
                    <ButtonsArea>
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => setIdPubli(item._id)}
                      >
                        <AiOutlineHeart />
                      </Button>
                      <Button length={item.comment.length}>
                        <Link to={`/post/${item._id}`}>
                          <AiOutlineComment />
                        </Link>
                      </Button>
                      <Button>
                        <AiOutlineShareAlt />
                      </Button>
                    </ButtonsArea>
                  </>
                )}
                {item.category === "article" && (
                  <>
                    <Article item={item} />
                    <ButtonsArea>
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => setIdPubli(item._id)}
                      >
                        <AiOutlineHeart />
                      </Button>
                      <Button length={item.comment.length}>
                        <Link to={`/post/${item._id}`}>
                          <AiOutlineComment />
                        </Link>
                      </Button>
                      <Button>
                        <AiOutlineShareAlt />
                      </Button>
                    </ButtonsArea>
                  </>
                )}

                {item.category === "picture" && (
                  <>
                    <Publication item={item} />
                    <ButtonsArea className="picture">
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => setIdPubli(item._id)}
                      >
                        <AiOutlineHeart />
                      </Button>
                      <Button length={item.comment.length}>
                        <Link to={`/post/${item._id}`}>
                          <AiOutlineComment />
                        </Link>
                      </Button>
                    </ButtonsArea>
                  </>
                )}
              </PostItem>
            ))}

          <PostItem id="more"></PostItem>
        </UserFeed>
      </Container>
    </>
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
const mapDispachToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
