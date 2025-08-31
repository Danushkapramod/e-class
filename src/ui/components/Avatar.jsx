import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../authentication/useLogout';
import { useAuther } from '../../authentication/useAuther';

function Avatar() {
  const [isOpen, setIsOpen] = useState();
  const { mutate: logout, isLoading } = useLogout();
  const { auther } = useAuther();

  return (
    <div className=" relative flex items-center justify-center">
      <button onClick={() => setIsOpen(!isOpen)}>
        <div className="aspect-square h-10 items-center justify-center overflow-hidden rounded-full">
          <img
            className="h-full"
            src={
              auther?.auther?.avatar
                ? auther?.auther?.avatar
                : 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
            }
            alt="avatar"
          ></img>
        </div>
      </button>
      {isOpen && (
        <ul
          onClick={() => setIsOpen(false)}
          className=" absolute right-0 top-12 z-40 flex w-48  flex-col divide-y divide-bg--primary-100 
           rounded border  border-bg--primary-200
           bg-bg--primary-300 p-0 text-sm"
        >
          <Link
            to="/app/account/me"
            className=" flex h-10 items-center gap-2 px-4 hover:bg-white/5"
          >
            <span className=" material-symbols-outlined scale-75 font-light">manage_accounts</span>
            <span>Account</span>
          </Link>
          <Link className=" flex h-10 items-center gap-2 px-4  hover:bg-white/5">
            <span className="  material-symbols-outlined  scale-75 font-light">settings</span>
            <span>Settings</span>
          </Link>
          <button
            disabled={isLoading}
            onClick={logout}
            className=" flex h-10 items-center gap-2 px-4  hover:bg-white/5"
          >
            <span className="  material-symbols-outlined  scale-75 font-light">logout</span>
            <span>Logout</span>
          </button>
        </ul>
      )}
    </div>
  );
}

export default Avatar;
