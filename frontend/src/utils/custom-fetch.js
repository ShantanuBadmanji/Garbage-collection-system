const customFetch = async (url, options = {}) => {
  const defaultOptions = {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  };
  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
  });

  return await response.json();
};

export default customFetch;
