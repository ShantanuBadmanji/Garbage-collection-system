import { useParams, useSearchParams } from "react-router-dom";
// import { createURIQuery } from "../utils/customize-url";

function UserDashboad() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  // const url = createURIQuery("https://lshssds.com", { all: 5, name: "mahesh" });
  console.log(params, [...searchParams.entries()]);
  return <div>UserDashboad {params.userId}</div>;
}

export default UserDashboad;
