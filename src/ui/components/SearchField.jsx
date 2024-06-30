// eslint-disable-next-line react/prop-types
function SearchField({ onChange, className, placeholder }) {
  return (
    <div className=" relative flex items-center ">
      <span className=" material-symbols-outlined absolute scale-90 pl-2">
        search
      </span>
      <input
        onChange={onChange}
        className={` rounded border border-slate-700 bg-white/10 py-1 pl-9 pr-4 outline-none ${className}`}
        type="text"
        placeholder={placeholder || "Search"}
      />
    </div>
  );
}

export default SearchField;
