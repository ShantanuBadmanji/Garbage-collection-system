import useAuthId from "./useAuthId";

const useFetch = async (url, options = {}) => {
  const { logout } = useAuthId();
  const defaultOptions = {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const response = await await fetch(url, {
    ...defaultOptions,
    ...{ options },
  });
  if (response.status == 401) {
    logout();
  }
  return await response.json();
};

export default useFetch;
