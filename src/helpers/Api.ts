import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "http://localhost";

type PublicationFilter = {
  author?: string;
  cat?: string;
  limit?: number;
  offset?: number;
  sort?: "asc" | "desc";
};

const apiFetchPost = async (endpoint: string, body: any) => {
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

const apiFetchPut = async (endpoint: string, body: any) => {
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
  editUserInfo: async (fData: FormData) => {
    const json = await apiFetchFile("/user/me", fData);

    return json;
  },
  getPublications: async (options?: PublicationFilter) => {
    const json = await apiFetchGet("/publications", options);

    return json;
  },
  getPublicationItem: async (id: string) => {
    const json = await apiFetchPost("/publication/one", { id });

    return json;
  },
  updateLike: async (id: string) => {
    const json = await apiFetchPut(`/like/${id}`, { id });

    return json;
  },
  createComment: async (msg: string, id: string, type?: string) => {
    const json = await apiFetchPut("/comment", {
      msg,
      postId: id,
      type: "text",
    });

    return json;
  },
};

export default () => NoChatAPi;
