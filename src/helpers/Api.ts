import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "http://localhost";

interface BodyType {
  [key: string]: string;
}

type PublicationFilter = {
  author?: string;
  cat?: string;
};

type BodyGet = {
  id: string;
  token?: string;
};

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

const apiFetchGet = async (endpoint: string, body: any = []) => {
  if (!body.token) {
    let token = Cookie.get("token");
    if (token) {
      body.token = token;
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

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
    method: "PUT",
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
    const json = await apiFetchPost("/signin", { email, password });

    return json;
  },
  register: async (email: string, password: string, name: string) => {
    const json = await apiFetchPost("/signup", { email, password, name });

    return json;
  },
  userInfo: async () => {
    const json = await apiFetchGet("/user/me");

    return json;
  },
  editUserInfo: async (body: any) => {
    const json = await apiFetchFile("/user/me", body);

    return json;
  },
  getPublications: async (options: PublicationFilter) => {
    const json = await apiFetchGet("/publications", options);

    return json;
  },
  getPublicationInfo: async (body: BodyGet) => {
    const json = await apiFetchPost("/publication/one", body);

    return json;
  },
  updateLike: async (body: BodyType) => {
    const json = await apiFetchPut(`/like/${body.id}`, body);

    return json;
  },
};

export default () => NoChatAPi;
