import { ref } from "vue";

export function useFetch(url, params = {}) {
  const data = ref(null);
  const error = ref(null);

  if (params.body) JSON.stringify(params.body);

  params.headers = {
    "Content-Type": "application/json",
  };
  const baseURL = "main";
  fetch(baseURL + url, params)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
