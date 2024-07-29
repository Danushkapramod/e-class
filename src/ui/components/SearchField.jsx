import useOColor from '../../utils/getOColor';

// eslint-disable-next-line react/prop-types
function SearchField({ onChange, className, placeholder }) {
  const theme = useOColor();
  return (
    <div className=" relative flex items-center ">
      <span className=" material-symbols-outlined absolute scale-90 pl-2 text-xl">search</span>
      <input
        onChange={onChange}
        className={`rounded border border-bg--primary-100 text-sm ${theme ? 'bg-white/5' : 'bg-white/40'} py-1 pl-9 pr-4 outline-none ${className}`}
        type="text"
        placeholder={placeholder || 'Find'}
      />
    </div>
  );
}

export default SearchField;
