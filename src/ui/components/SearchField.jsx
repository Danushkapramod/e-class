// eslint-disable-next-line react/prop-types
function SearchField({ onChange, className, placeholder }) {
  return (
    <div className=" relative flex items-center ">
      <span className=" material-symbols-outlined absolute scale-90 pl-2 text-xl">search</span>
      <input
        onChange={onChange}
        className={` rounded border border-border-2 bg-transparent py-1 pl-9 pr-4 text-sm outline-none ${className}`}
        type="text"
        placeholder={placeholder || 'Find'}
      />
    </div>
  );
}

export default SearchField;
