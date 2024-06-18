import InputFiles from "../components/Form/InputFiles";
import InputRadioButtons from "../components/Form/InputRadioButtons";
import useProfile from "../hooks/useProfile";
import customFetch from "../utils/custom-fetch";
import getUserLocation from "../utils/get-user-location";
import uploadImagesCloudinary from "../utils/upload-image-cloudinary";

const wasteTypes = [
  { id: 81, type_name: "e-waste" },
  { id: 82, type_name: "bio-waste" },
  { id: 83, type_name: "bio-medical" },
  { id: 84, type_name: "construction-waste" },
  { id: 85, type_name: "hazardous-waste" },
];

const UserDashboad = () => {
  const { profile } = useProfile();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const wasteType = +data.get("wasteType");
    const files = data.getAll("images");
    try {
      const location = await getUserLocation();
      const fileURLsArray = await uploadImagesCloudinary(files);

      const payload = { wasteType, location, beforeImage: fileURLsArray };
      const moreOptions = {
        method: "POST",
        body: JSON.stringify(payload),
      };
      const response = await customFetch(
        `${import.meta.env.VITE_BACKEND_API_URI}/complaints`,
        moreOptions
      );

      console.log("fetch response: ", response);
    } catch (error) {
      console.log("try-again!!", error.message);
    }
  };

  return (
    <>
      <h1>UserDashboad {profile?.name}</h1>
      <form onSubmit={handleOnSubmit}>
        <InputRadioButtons wasteTypes={wasteTypes} fieldName="wasteType" />
        <br />
        <InputFiles />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default UserDashboad;
