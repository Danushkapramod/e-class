import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import useOColor from '../../utils/getOColor';

// eslint-disable-next-line react/prop-types
function Button({
  onClick,
  disabled,
  children,
  to,
  icon,
  type,
  onType,
  className,
  spinner,
  id,
  ref,
  htmlFor,
  sp_color,
}) {
  const theme = useOColor();
  const smallSecondery = `text--text-primary flex items-center 
                          rounded border border-bg--primary-100 
                          py-1 text-sm uppercase shadow-sm
                          transition-all duration-100
                          hover:bg-white/10 active:bg-white/10
                          ${theme ? 'bg-white/5' : 'bg-white/40'}
                          ${children && icon && 'gap-1'} 
                          ${!children && icon ? 'px-1' : 'px-2 pr-3'}`;

  const smallPrimary = `text-slate-200 flex items-center 
                          rounded transition-all duration-100
                          hover:bg-blue-700 active:bg-blue-500 shadow-sm
                          bg-blue-600 px-2 py-1 text-sm uppercase
                          ${children && icon && 'gap-1'}`;

  const primary = `text-slate-200 flex items-center 
                         gap-2 rounded  bg-blue-600 px-[15px] py-[7px] text-base 
                         border border-blue-600 
                         transition-all duration-100 shadow-sm
                         hover:bg-blue-700 active:bg-blue-500
                         uppercase ${children && icon && 'gap-1'}
                       ${children && icon ? 'pl-[10px]' : ''}`;

  const secondery = `text--text-primary flex items-center 
                         gap-2 rounded  px-[15px] py-[7px] text-base 
                         border border-bg--primary-100 uppercase 
                         transition-all duration-100 shadow-sm
                         hover:bg-white/5 active:bg-white/10
                         ${theme ? 'bg-white/5' : 'bg-white/40'}
                         ${children && icon ? 'pl-[10px] gap-1' : ''}
                         ${!children && icon ? 'px-[8px] gap-[0]' : ''}`;

  const xsSecondery = `text--text-primary flex items-center 
                         rounded border border-bg--primary-100 
                         text-xs uppercase justify-center  
                         transition-all duration-100 shadow-sm
                          ${theme ? 'bg-white/5' : 'bg-white/40'}
                         hover:bg-white/5 active:bg-white/10
                         ${
                           children && icon
                             ? 'gap py-0 px-2'
                             : children && !icon
                               ? 'py-1 px-2'
                               : !children && icon
                                 ? ''
                                 : ''
                         } 
                        `;

  const xsPrimary = `   text-slate-200 flex items-center 
                        rounded border border-blue-600 
                         text-center justify-center shadow-sm  
                         bg-blue-600   text-xs uppercase
                        transition-all duration-100 bg-blue-600 
                        hover:bg-blue-700 active:bg-white/10
                        ${children && icon ? 'gap py-0 px-2' : children && !icon ? 'py-1 px-2' : !children && icon ? '' : ''} 
                       `;
  const link = `text-blue-400 gap-2  flex items-center`;

  if (type === 'xsSecondery') {
    if (to) {
      return (
        <Link to={to} type={onType} className={`${xsSecondery} ${className}`}>
          {icon && <span className="material-symbols-outlined  scale-[0.70]  ">{icon}</span>}
          <span className="pt-px">{children}</span>
        </Link>
      );
    }
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        type={onType}
        htmlFor={htmlFor}
        ref={ref}
        className={`${xsSecondery} ${className}`}
      >
        {icon && <span className="material-symbols-outlined scale-[0.70]  ">{icon}</span>}
        <span className={`${spinner && 'opacity-0'} pt-px`}>{children}</span>
        {spinner && (
          <div className=" absolute flex w-fit  scale-[35%] items-center justify-center ">
            <FadeLoader margin={0} color="#FFFFFF" />
          </div>
        )}
      </button>
    );
  }

  if (type === 'xsPrimary') {
    if (to) {
      return (
        <Link to={to} type={onType} className={`${xsPrimary} ${className}`}>
          {icon && <span className="material-symbols-outlined scale-[0.70]  ">{icon}</span>}
          <span className="pt-px">{children}</span>
        </Link>
      );
    }
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        type={onType}
        htmlFor={htmlFor}
        ref={ref}
        className={`${xsPrimary} ${className}`}
      >
        {icon && <span className="material-symbols-outlined scale-[0.70]  ">{icon}</span>}
        <span className={`${spinner && 'opacity-0'} pt-px`}>{children}</span>
        {spinner && (
          <div className=" absolute flex  scale-[35%] items-center justify-center ">
            <FadeLoader margin={0} color="#FFFFFF" />
          </div>
        )}
      </button>
    );
  }

  if (type === 'smallSecondery') {
    if (to) {
      return (
        <Link to={to} type={onType} ref={ref} onClick={onClick} className={smallSecondery}>
          {icon && <span className="material-symbols-outlined scale-[0.80]  ">{icon}</span>}
          <span className="pt-px">{children}</span>
        </Link>
      );
    }
    return (
      <button
        ref={ref}
        onClick={onClick}
        type={onType}
        className={`${smallSecondery} ${className} `}
      >
        {icon && !spinner && (
          <span className="material-symbols-outlined scale-[0.80]  ">{icon}</span>
        )}
        <span className="pt-px">{children}</span>
        {spinner && (
          <div className=" mr-1 flex h-6 w-6 scale-[35%] items-center justify-center ">
            <FadeLoader margin={0} color="#FFFFFF" />
          </div>
        )}
      </button>
    );
  }

  if (type === 'smallPrimary') {
    return (
      <button
        id={id}
        ref={ref}
        type={onType}
        onClick={onClick}
        className={`${smallPrimary} ${className}`}
      >
        {icon && <span className="material-symbols-outlined scale-[0.80]  ">{icon}</span>}
        <span className="pt-px">{children}</span>
      </button>
    );
  }

  if (type === 'primary') {
    if (to) {
      return (
        <Link to={to} type={onType} onClick={onClick} className={primary}>
          {icon && <span className=" material-symbols-outlined scale-90">{icon}</span>}
          <span>{children}</span>
        </Link>
      );
    }

    return (
      <button
        type={onType}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        className={`${primary}  relative w-max ${className}`}
      >
        {icon && <span className=" material-symbols-outlined scale-90">{icon}</span>}
        <span className={`${spinner && 'opacity-0'}`}>{children}</span>
        {spinner && (
          <div
            className=" absolute flex  scale-[40%] items-center 
          justify-center  text-center "
          >
            <FadeLoader margin={0} color="#FFFFFF" />
          </div>
        )}
      </button>
    );
  }

  if (type === 'secondery') {
    if (to === '-1') {
      return (
        <Link to={-1} disabled={disabled} className={`${secondery} ${className}`}>
          {icon && <span className=" material-symbols-outlined scale-90">{icon}</span>}
          <span>{children}</span>
        </Link>
      );
    }

    return (
      <button
        disabled={disabled}
        type={onType}
        onClick={onClick}
        ref={ref}
        className={`${secondery} ${className}`}
      >
        {icon && <span className=" material-symbols-outlined scale-90">{icon}</span>}
        <span className={`${spinner && 'opacity-0'}`}>{children}</span>
        {spinner && (
          <div
            className=" absolute flex  scale-[40%] items-center 
          justify-center  text-center "
          >
            <FadeLoader margin={0} color={sp_color || '#FFFFFF'} />
          </div>
        )}
      </button>
    );
  }

  if (type === 'link')
    return (
      <Link to={to} type={onType} onClick={onClick} className={link}>
        <span className=" underline">{children}</span>
        {icon && <span className=" material-symbols-outlined  scale-75">{icon}</span>}
      </Link>
    );
}

export default Button;
