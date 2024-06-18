import { useEffect, useRef, useState } from "react";
import InputFiles from "../components/Form/InputFiles";
import useProfile from "../hooks/useProfile";
import customFetch from "../utils/custom-fetch";
import uploadImagesCloudinary from "../utils/upload-image-cloudinary";

const customStyle = {
  gap: "5px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

const EmployeeDashboard = () => {
  const { profile } = useProfile();
  const [complaints, setComplaints] = useState(null);
  const tokenRef = useRef();

  useEffect(() => {
    (async () => {
      const [res] = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/complaints`
      );
      console.log(res);
      setComplaints(res);
    })();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const files = data.getAll("images");
    try {
      const fileURLsArray = await uploadImagesCloudinary(files);

      const payload = {
        complaintToken: tokenRef.current.value,
        afterImage: fileURLsArray,
      };
      const moreOptions = {
        method: "PATCH",
        body: JSON.stringify(payload),
      };
      const response = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/complaints/${
          tokenRef.current.value
        }`,
        moreOptions
      );

      console.log("fetch response: ", response);
    } catch (error) {
      console.log("try-again!!", error.message);
    }
  };

  return (
    <main style={{ ...customStyle, marginBottom: "50px" }}>
      <h1>EmployeeDashboad {profile?.name}</h1>

      <table>
        <tr>
          <th width={10}>sr.no</th>
          <th width={120}>complaint-token</th>
          <th width={20}>complaint-status</th>
          <th width={120}>address</th>
          <th>Image-urls</th>
        </tr>
        {complaints &&
          complaints.map((comp, index) => (
            <tr key={"table" + index}>
              <td>{index + 1}</td>
              <td
                onClick={() => (tokenRef.current.value = comp.complaint_token)}
              >
                {comp.complaint_token}
              </td>
              <td>{comp.current_status}</td>
              <td>{comp.address}</td>
              <td>
                <ol>
                  {comp.url_list
                    ?.split(",")
                    ?.filter((str) => str != "")
                    .map((url, i) => (
                      <img
                        key={"image" + i}
                        src={url}
                        height={100}
                        onClick={() => {
                          window.open(url);
                        }}
                      />
                    ))}
                </ol>
              </td>
            </tr>
          ))}
      </table>

      <form
        style={{
          ...customStyle,
          marginTop: "50px",
          alignItems: "start",
          gap: "3px",
        }}
        onSubmit={handleOnSubmit}
      >
        <label htmlFor="complaint-token">
          Complaint Token:{" "}
          <input
            ref={tokenRef}
            type="text"
            name="complaintToken"
            id="complaintToken"
            placeholder="complaint-token"
            required
          />
        </label>
        <InputFiles />
        <button type="submit">submit</button>
      </form>
    </main>
  );
};

export default EmployeeDashboard;
