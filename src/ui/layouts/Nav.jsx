import Avatar from "../components/Avatar";
import NavButton from "../components/NavButton";

// eslint-disable-next-line react/prop-types
function Nav({ sidebarHandler }) {
  return (
    <div
      className="flex min-h-14 items-center justify-between 
     border-b border-slate-800 bg-dark-primary pr-4 "
    >
      <div>
        <NavButton onClick={sidebarHandler} name={"menu"} />
      </div>
      <div className="flex items-center ">
        <NavButton name={"search"} />
        <NavButton name={"bookmark"} />
        <div className="ml-4 ">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

export default Nav;
