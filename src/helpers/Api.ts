import Cookie from "js-cookie";
import qs from "qs";

const BASEAPI = "https://nochat-api.herokuapp.com";
//const BASEAPI = "http://localhost";

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
  deleteComment: async (id: string) => {
    const json = await apiFetchPut(`/comment/${id}`, {});

    return json;
  },
  createPublication: async (fData: FormData) => {
    let token = Cookie.get("token");
    if (token) {
      fData.append("token", token);
    }

    const res = await fetch(BASEAPI + "/publication", {
      method: "POST",
      body: fData,
    });

    const json = await res.json();

    if (json.notallowed) {
      window.location.href = "/signin";
      return;
    }

    return json;
  },
  deletePublication: async (body: { token?: string; id: string }) => {
    if (!body.token) {
      let token = Cookie.get("token");
      if (token) {
        body.token = token;
      }
    }

    const res = await fetch(BASEAPI + `/publication/delete/${body.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    return json;
  },
  getUsers: async (q: string) => {
    const json = await apiFetchGet("/users", { q });

    return json;
  },
  getOneUser: async (name: string) => {
    const json = await apiFetchPost("/user/one", { name });

    return json;
  },
  followUser: async (id: string) => {
    const json = await apiFetchPut(`/follow/${id}`, { id });

    return json;
  },
  unfollowUser: async (id: string) => {
    const json = await apiFetchPut(`/unfollow/${id}`, { id });

    return json;
  },
  newChat: async (userId: string) => {
    const json = await apiFetchPost("/direct/newchat", { userId });

    return json;
  },
  sendMessage: async (msg: string, id: string, type?: string) => {
    const json = await apiFetchPut("/direct/chat", {
      msg,
      userId: id,
      type: "text",
    });

    return json;
  },
  deleteMessage: async (id: string) => {
    const json = await apiFetchPut(`/direct/${id}`, {});

    return json;
  },
};

export default () => NoChatAPi;
