import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "https://nochat-api.herokuapp.com";

interface BodyType {
  [key: string]: string;
}

const apiFetchPost = async (endpoint: string, body: BodyType) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchPut = async (endpoint: string, body: BodyType) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchGet = async (endpoint: string, body: BodyType) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const apiFetchFile = async (endpoint: string, body: any) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.append("token", token);
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: "POST",
    body,
  });

  const json = await res.json();

  if (json.notallowed) {
    window.location.href = "/signin";
    return;
  }

  return json;
};

const NoChatAPi = {
  login: async (email: string, password: string) => {
    const json = await apiFetchPost("/singin", { email, password });

    return json;
  },
  register: async (email: string, password: string, name: string) => {
    const json = await apiFetchPost("/singup", { email, password, name });

    return json;
  },
};

export default () => NoChatAPi;
