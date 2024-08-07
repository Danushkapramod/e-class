import { NavLink } from 'react-router-dom';
import Logo from '../components/Logo';
import { useLogout } from '../../authentication/useLogout';

// eslint-disable-next-line react/prop-types
function Sidebar({ sidebarOpen }) {
  const { mutate: logout, isLoading } = useLogout();
  return (
    <div
      style={sidebarOpen ? { width: '15rem' } : { width: '0' }}
      className="border-r-border-3 dark flex h-dvh shrink-0 flex-col items-center overflow-hidden
       border-r bg-bg--primary-300 py-6 transition-all duration-300 ease-in-out"
    >
      <Logo />
      <div className="divide-border-3  mt-8 flex w-full  flex-col divide-y px-3 ">
        <NavLink
          to="dashbord"
          className="flex gap-4 rounded-sm  py-2 pl-4 transition-all duration-150 
          first-line:items-center hover:bg-white/10 hover:text-bg--secondery-2"
        >
          <span className=" material-symbols-outlined font-light">Dashboard</span>
          <span className=""> Dashbord</span>
        </NavLink>

        <NavLink
          to="classes"
          className="flex gap-4 rounded-sm  py-2 pl-4 transition-all duration-150 
          first-line:items-center hover:bg-white/10 hover:text-bg--secondery-2"
        >
          <span className="material-symbols-outlined font-light">school</span>
          <span className=" ">Class</span>
        </NavLink>

        <NavLink
          to="teachers"
          className="flex gap-4 rounded-sm  py-2 pl-4 transition-all duration-150 
          first-line:items-center hover:bg-white/10  hover:text-bg--secondery-2"
        >
          <span className="material-symbols-outlined font-light">group</span>
          <span className="">Teacher</span>
        </NavLink>
        <NavLink
          to="options"
          className="flex gap-4 rounded-sm py-2 pl-4 transition-all duration-150 
          first-line:items-center hover:bg-white/10  hover:text-bg--secondery-2"
        >
          <span className="material-symbols-outlined font-light">post_add</span>
          <span className="">Options</span>
        </NavLink>
      </div>
      <div className="mt-auto w-full px-4 text-bg--secondery-2">
        <button
          disabled={isLoading}
          onClick={logout}
          className="flex w-full items-center justify-start gap-2 rounded-full
           border border-bg--primary-100 py-1.5 pl-4 transition-all duration-150
           first-line:items-center hover:bg-white/[0.03]"
        >
          <span className="material-symbols-outlined scale-75 font-light">logout</span>
          <span className=" text-sm ">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
