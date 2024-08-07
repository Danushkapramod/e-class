import clsx from 'clsx';
import PropTypes from 'prop-types';

Checkbox.propTypes = {
  width: PropTypes.string,
  checked: PropTypes.string,
  trueCall: PropTypes.func,
  falseCall: PropTypes.func,
  border: PropTypes.string,
  _checked: PropTypes.bool,
  undefined: PropTypes.string,
  borderColor: PropTypes.string,
  id: PropTypes.string,
};

export default function Checkbox({
  width,
  checked,
  trueCall,
  falseCall,
  border,
  _checked,
  unchecked,
  borderColor,
  id,
}) {
  function onCheckHandler(e) {
    if (e.target.checked) {
      trueCall();
    } else {
      falseCall();
    }
  }
  return (
    <div
      className={clsx(
        `relative z-0 flex aspect-square w-4 items-center justify-center`,
        `w-[${width}]`,
        `border-[${border}]`,
        `bg-[${unchecked}]`
      )}
    >
      <input
        id={id}
        onClick={onCheckHandler}
        type="checkbox"
        checked={_checked}
        className={clsx(
          `peer h-full w-full appearance-none rounded-sm border border-slate-400 bg-transparent`,
          `border-[${borderColor}]`
        )}
      />
      <label
        className=" absolute inset-0 hidden bg-transparent
         peer-checked:z-20 peer-checked:flex"
        htmlFor={id}
      >
        <svg
          className={clsx('rounded-sm bg-blue-600', `bg-[${checked}]`)}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#e8eaed"
        >
          <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
        </svg>
      </label>
    </div>
  );
}
