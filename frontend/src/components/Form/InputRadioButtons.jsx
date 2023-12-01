/* eslint-disable react/prop-types */

const InputRadioButtons = ({ wasteTypes, fieldName }) => {
  return (
    <>
      {wasteTypes.map(({ id, type_name }, index) => (
        <label key={index}>
          <input
            type="radio"
            name={fieldName}
            id={type_name}
            value={id}
            required
          />
          {type_name}
        </label>
      ))}
    </>
  );
};

export default InputRadioButtons;
