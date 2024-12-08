const PersonForm = ({ handleSubmit, valueName, handleName, valueNumber, handleNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={valueName} onChange={handleName} />
      </div>
      <div>
        number: <input value={valueNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
