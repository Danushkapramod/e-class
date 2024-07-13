// eslint-disable-next-line react/prop-types
function NavButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hover:bg-bg--primary-200 ml-3 flex items-center justify-center rounded-full p-2"
    >
      <div className=" material-symbols-outlined ">{name}</div>
    </button>
  );
}

export default NavButton;
