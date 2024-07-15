// eslint-disable-next-line react/prop-types
function NavButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="ml-3 flex items-center justify-center rounded-full p-2 hover:bg-bg--primary-200"
    >
      <div className=" material-symbols-outlined font-light ">{name}</div>
    </button>
  );
}

export default NavButton;
