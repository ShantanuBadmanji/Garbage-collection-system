/* eslint-disable react/prop-types */

const InputRadioButtons = ({ wasteTypes, fieldName }) => {
  return (
    <>
      {wasteTypes.map(({ id, name }, index) => (
        <label key={index}>
          <input type="radio" name={fieldName} id={name} value={id} required />
          {name}
        </label>
      ))}
    </>
  );
};

export default InputRadioButtons;
