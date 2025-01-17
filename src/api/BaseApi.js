import useApiMessage from "@/composables/apiMessage";
import logout from "@/composables/logout";

export class BaseApi {
  constructor(baseURL = "/main/main/") {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    const token = localStorage.getItem("access_token");
    options.headers = {
      "Content-Type": "application/json",
    };

    if (url !== "signup" && token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(this.baseURL + url, options);

      const result = await response.json();
      if (!response.ok || !result.ok) {
        const error = result?.error?.detail || "An error occurred";

        useApiMessage(error);
        throw error;
      }

      if (url == "signup" && result?.data?.access && result?.data?.refresh) {
        const { refresh, access } = result.data;
        localStorage.access_token = access;
        localStorage.refresh_token = refresh;
      }

      return result.data;
    } catch (error) {
      useApiMessage(error);
      return error;
    }
  }

  get(url, params) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    return this.request(url + query, {
      method: "GET",
    });
  }

  post(url, data) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(url, data) {
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(url) {
    return this.request(url, {
      method: "DELETE",
    });
  }
}

const getValue = (variable) => variable;

let intervals = {};
const asyncInterval = (interval = 1000, condition) => {
  return new Promise((resolve, reject) => {
    let id = String(Math.random());
    intervals[id] = setInterval(() => {
      if (getValue(condition)) {
        clearInterval(intervals[id]);
        resolve();
      }
    }, interval);
  });
};

let isRefreshing = false;

const { fetch: originalFetch } = window;

async function refreshToken() {
  const response = await fetch(
    "/main/main/refresh?token=" + localStorage.getItem("refresh_token"),
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );

  const result = await response.json();

  if (result.ok && result.data && result.data.access) {
    const newToken = result.data.access;
    localStorage.setItem("access_token", newToken);
    return newToken;
  } else {
    isRefreshing = false;
    logout();
    return null;
  }
}

window.fetch = async (...args) => {
  let [resource, config] = args;

  let response = await originalFetch(resource, config);

  // If 401 - Unauthorized
  if (response.status === 401) {
    logout();
  }

  // If 403 - Token might be expired
  if (response.status === 403 && !resource.includes("/main/main/refresh")) {
    if (getValue(isRefreshing)) {
      await asyncInterval(100, () => !isRefreshing);

      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;

      return await originalFetch(resource, config);
    } else {
      isRefreshing = true;
      const newToken = await refreshToken();

      if (newToken) {
        isRefreshing = false;
        config.headers.Authorization = `Bearer ${newToken}`;
        return await originalFetch(resource, config);
      }
    }
  }

  return response;
};
