import React, { useState, useEffect } from "react";
import useApi from "../../helpers/Api";
import { doLogin } from "../../helpers/Auth";
import { Container } from "./styles";

const Profile: React.FC = () => {
  const api = useApi();
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserInformation = async () => {
      const info = await api.userInfo();
      setUser(info);
    };

    getUserInformation();
  }, [api]);

  console.log(user);

  return (
    <>
      <Container>Esse é o Profile</Container>
    </>
  );
};
export default Profile;
