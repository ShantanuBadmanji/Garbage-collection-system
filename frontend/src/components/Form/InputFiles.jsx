const InputFiles = () => {
  const handleOnChangeFiles = (e) => {
    e.preventDefault();
    const files = [...e.target.files];

    if (files.every((file) => RegExp("^image/+").test(file.type)))
      console.log("all of image type");
    else console.log("all NOT of image type");
  };

  return (
    <label>
      upload images of garbage:{"  "}
      <input
        type="file"
        name="images"
        id="images"
        accept="image/*"
        multiple
        required
        onChange={handleOnChangeFiles}
      />
    </label>
  );
};

export default InputFiles;
