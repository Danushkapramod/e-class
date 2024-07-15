import { useEffect, useRef } from 'react';

function AutoCloseWindow({ children, set }) {
  const ref = useRef();

  function clickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      set(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);
  return <div ref={ref}>{children} </div>;
}
export default AutoCloseWindow;
