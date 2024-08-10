import ReactDOM from 'react-dom';

export function Portal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById('portal-root'));
}

const Tooltip = ({ position, children }) => {
  const { top, left } = position;

  return (
    <Portal>
      <div
        style={{
          position: 'absolute',
          top: `${top}px`,
          left: `${left}px`,
          zIndex: 1000,
        }}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Tooltip;
