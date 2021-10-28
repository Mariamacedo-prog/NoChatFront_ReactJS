import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PublicationsType } from "../../reducers/UserReducer";
import Publication from "../../components/Publication";
import Article from "../../components/Article";
import Button from "../../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../helpers/Api";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import * as C from "./styles";

const Home = (props: any) => {
  const api = useApi();
  const [publications, setPublications] = useState([]);
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    setErrors("");
    const getUserPublications = async () => {
      const json = await api.getPublications({
        limit: limit,
        sort: "desc",
      });

      if (json.error) {
        setErrors(json.error);
        setLoading(false);
      } else {
        setPublications(json.publications);
        setLoading(false);
      }
    };
    getUserPublications();
  }, [api, like, limit]);

  const handleLike = async (id: string) => {
    setErrors("");
    const json = await api.updateLike(id);

    if (json.error) {
      setErrors(json.error);
    } else {
      if (like !== json.liked) {
        setLike(json.liked);
      } else {
        setLike(!json.liked);
        setLike(json.liked);
      }
    }
  };

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
      <C.Container>
        <C.UserFeed>
          {loading && <p>Loading...</p>}
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
          {publications &&
            publications.map((item: PublicationsType) => (
              <C.PostItem key={item._id}>
                {item.category === "publication" && (
                  <>
                    <Publication item={item} />
                    <C.ButtonsArea>
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => handleLike(item._id)}
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
                    </C.ButtonsArea>
                  </>
                )}
                {item.category === "article" && (
                  <>
                    <Article item={item} />
                    <C.ButtonsArea>
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => handleLike(item._id)}
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
                    </C.ButtonsArea>
                  </>
                )}

                {item.category === "picture" && (
                  <>
                    <Publication item={item} />
                    <C.ButtonsArea className="picture">
                      <Button
                        classes={
                          item.like.some((item) => item === props._id)
                            ? "liked"
                            : undefined
                        }
                        length={item.like.length}
                        handleButton={() => handleLike(item._id)}
                      >
                        <AiOutlineHeart />
                      </Button>
                      <Button length={item.comment.length}>
                        <Link to={`/post/${item._id}`}>
                          <AiOutlineComment />
                        </Link>
                      </Button>
                    </C.ButtonsArea>
                  </>
                )}
              </C.PostItem>
            ))}

          <C.PostItem id="more"></C.PostItem>
        </C.UserFeed>
      </C.Container>
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
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
