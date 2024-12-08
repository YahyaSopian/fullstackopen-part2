const Filter = ({ value, handleFilter }) => {
  return (
    <div>
      filter shawn with <input value={value} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
