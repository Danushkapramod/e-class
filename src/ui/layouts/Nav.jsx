import { useEffect, useState } from 'react';
import Avatar from '../components/Avatar';
import NavButton from '../components/NavButton';
import { useDispatch } from 'react-redux';
import { setUiTheme } from '../../GlobalUiState';

// eslint-disable-next-line react/prop-types
export default function Nav({ sidebarHandler }) {
  return (
    <div
      className=" flex min-h-14  items-center  justify-between
      border-b border-border-3 bg-bg--primary-300 pr-4"
    >
      <div>
        <NavButton onClick={sidebarHandler} name={'menu'} />
      </div>
      <div className="flex items-center ">
        <ThemeToggle />
        <NavButton name={'search'} />
        <NavButton name={'bookmark'} />
        <div className="ml-4 ">
          <Avatar />
        </div>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('theme', 'dark');
      dispatch(setUiTheme('dark'));
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.setAttribute('theme', 'light');
      dispatch(setUiTheme('light'));
      localStorage.setItem('theme', 'light');
    }
  }, [dispatch, theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? <NavButton name="light_mode" /> : <NavButton name="dark_mode" />}
    </button>
  );
}
