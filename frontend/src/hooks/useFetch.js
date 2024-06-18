// import { useEffect, useState } from "react";
// import { Navigate, redirect } from "react-router-dom";
// import useAuthId from "./useAuthId";

// const useFetch = (url) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState(null);
//   const { logout } = useAuthId();

//   const defaultOptions = {
//     method: "GET",
//     credentials: "include",
//     headers: { "Content-Type": "application/json" },
//   };

//   useEffect(() => {
//     // first;

//     return () => {
//       // second;
//     };
//   }, [third]);

//   const customFetch = async (url, options = {}) => {
//     setIsLoading(true);
//     const response = await fetch(url, {
//       ...defaultOptions,
//       ...options,
//     });
//     if (response.status == 401) {
//       logout();
//     }

//     return await response.json();
//   };
//   return { customFetch, isLoading };
// };
// export default useFetch;
