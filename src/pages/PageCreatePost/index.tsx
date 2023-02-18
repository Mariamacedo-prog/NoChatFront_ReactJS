import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../helpers/Api";
import { AiFillPicture } from "react-icons/ai";
import { MdPhotoLibrary } from "react-icons/md";
import * as C from "./styles";

const PageCreatePost = (props: any) => {
  const [errors, setErrors] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [category, setCategory] = useState("publication");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const api = useApi();
  const refFile = useRef() as React.MutableRefObject<HTMLInputElement>;

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    setErrors("");

    let errors: string[] = [];
    if (errors.length === 0) {
      const fData = new FormData();
      fData.append("category", category);

      if (category === "publication" || category === "picture") {
        if (description.length < 401) {
          fData.append("description", description);
        } else {
          setErrors("Ultrapassou o máximo de caracteres!(400)");
          setDisabled(false);
          return;
        }

        if (refFile.current.files) {
          fData.append("image", refFile.current.files[0]);
        }
      }

      if (category === "article") {
        if (title.length < 71) {
          fData.append("title", title);
        } else {
          setErrors("Titulo ultrapassou o máximo de caracteres!(70)");
          setDisabled(false);
          return;
        }

        if (description !== "") {
          fData.append("description", description);
        } else {
          setErrors("Necessário conteúdo no artigo!");
          setDisabled(false);
          return;
        }
      }

      const json = await api.createPublication(fData);

      if (!json.error) {
        window.location.href = "/";

        return;
      } else {
        setErrors(json.error);
      }
    } else {
      setErrors(errors.join("\n"));
    }
    setDisabled(false);
  };
  return (
    <>
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
        <C.Form onSubmit={handleSubmit}>
          <C.UserDiv>
          {props.avatar !== "" ? (
              <img
                src={`${props.avatar}`}
                alt={`foto de perfil de ${props.name}`}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Avatar"
              />
            )}
            <p>
              {props.name}
   
                {/* <C.Title>Categoria: </C.Title> */}
                <select className="inputCategory" onChange={(e) => setCategory(e.target.value)}>
                  <option value="publication"> Publicação</option>
                  <option value="picture">Foto</option>
                  <option value="article">Artigo</option>
                </select>
         
            </p>
          </C.UserDiv>

          {category === "article" && (
            <label>
              <C.Input
                type="text"
                placeholder="Título: "
                maxLength={70}
                disabled={disabled}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          )}
          {category !== "article" && (
            <label className="LabelFile">
              <MdPhotoLibrary className="pictureSvg" />
              <C.InputFile
                type="file"
                disabled={disabled}
                required={category === "picture" ? true : undefined}
                ref={refFile}
              />
            </label>
          )}


          <label>
            <C.Description
              placeholder={`Escreva aqui sua descrição...`}
              disabled={disabled}
              maxLength={category !== "article" ? 400 : undefined}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          {category === "article" && (
            <p> * Titulo e descrição são itens obrigatórios!</p>
          )}
          {category === "picture" && (
            <p> * Foto e descrição são itens obrigatório!</p>
          )}
          {category === "publication" && (
            <p> * Descrição é obrigatória! Foto é opcional...</p>
          )}
          <C.CreateButton type="submit" disabled={disabled}>
            POSTAR
          </C.CreateButton>
        </C.Form>
      </C.Container>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    name: state.user.name,
    avatar: state.user.avatar,
    email: state.user.email,
    _id: state.user._id,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PageCreatePost);
