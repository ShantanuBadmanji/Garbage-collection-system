import InputFiles from "../components/Form/InputFiles";
import InputRadioButtons from "../components/Form/InputRadioButtons";
import useProfile from "../hooks/useProfile";
import getUserLocation from "../utils/get-user-location";
import uploadImagesCloudinary from "../utils/upload-image-cloudinary";

const wasteTypes = [
  { name: "HouseWaste", id: 2001 },
  { name: "EWaste", id: 2002 },
  { name: "Greenwaste", id: 2003 },
];

const UserDashboad = () => {
  const { profile } = useProfile();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const wasteType = data.get("wasteType");
    const files = data.getAll("images");
    try {
      const location = await getUserLocation();
      const fileURLsArray = await uploadImagesCloudinary(files);

      const payload = { wasteType, location, beforeImage: fileURLsArray };
      const options = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      };
      const response = await (
        await fetch(
          `${import.meta.env.VITE_BACKEND_API_URI}/complaints`,
          options
        )
      ).json();

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
