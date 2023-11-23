const uploadImagesCloudinary = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const payload = new FormData();
    payload.append("file", file);
    payload.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_KEY);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      { method: "POST", body: payload }
    ).then((res) => res.json());

    return response;
  });

  const responseArray = await Promise.allSettled(uploadPromises);

  const fileURLsArray = responseArray.reduce((acc, res) => {
    res.status === "fulfilled" && acc.push(res.value.secure_url);
    return acc;
  }, []);
  console.log(fileURLsArray);

  return fileURLsArray;
};

export default uploadImagesCloudinary;
