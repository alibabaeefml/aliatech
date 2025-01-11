export const API = async (url, params = {}) => {
  if (params.body) JSON.stringify(params.body);

  params.headers = {
    "Content-Type": "application/json",
  };

  const baseURL = "main";
  await fetch(baseURL + url, params);
};
