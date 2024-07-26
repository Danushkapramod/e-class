import { useCallback, useEffect, useRef } from 'react';

function AutoCloseWindow({ children, set, refItems, className }) {
  const ref = useRef();

  const clickOutside = useCallback(
    (e) => {
      if (ref.current && !(ref.current.contains(e.target) || refItems.contains(e.target))) {
        set(false);
      }
    },
    [refItems, set]
  );
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [clickOutside]);
  return (
    <div className={className} ref={ref}>
      {children}{' '}
    </div>
  );
}
export default AutoCloseWindow;
