import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { CircleSpinner } from 'react-spinners-kit';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(
  (
    {
      className,
      to,
      spinnerColor,
      size,
      variant,
      spinner,
      type,
      icon,
      label,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const buttonVariants = cva(
      `inline-flex gap-1 relative text-text-primary items-center
       justify-center rounded transition-colors duration-150 `,
      {
        variants: {
          variant: {
            primary: 'bg-blue-600 hover:bg-blue-500 text-slate-100',
            outline: `bg-transparent border border-border-2`,
            link: ' text-blue-400 font-base underline',
          },
          size: {
            base: `h-10 px-4 font-medium ${icon && !label && 'px-3'}`,
            sm: `h-8 px-3 rounded text-sm ${icon && !label && 'px-2'}`,
            xs: `h-6 px-2 rounded text-xs ${icon && !label && 'px-1.5'}`,
            link: 'h-max p-0 m-0',
          },
          compoundVariants: [
            {
              intent: 'link',
              size: 'link',
            },
          ],
        },
        defaultVariants: {
          variant: 'primary',
          size: 'base',
        },
      }
    );

    let _icon = { size: { height: '16px', width: '16px' }, scale: { transform: 'scale(75%)' } };
    let _spinner = 24;

    if (size === 'sm') {
      _icon = { size: { height: '14px', width: '14px' }, scale: { transform: 'scale(65%)' } };
      _spinner = 18;
    } else if (size === 'xs') {
      _icon = { size: { height: '10px', width: '10px' }, scale: { transform: 'scale(50%)' } };
      _spinner = 14;
    }
    if (to) {
      return (
        <Link
          ref={ref}
          to={to}
          className={twMerge(clsx(buttonVariants({ variant, size }), className))}
          {...props}
        >
          {icon && (
            <div
              style={{ ..._icon.size, opacity: spinner ? '0' : '1' }}
              className="flex items-center justify-center"
            >
              <span style={_icon.scale} className="material-symbols-outlined">
                {icon}
              </span>
            </div>
          )}

          {label && <div style={spinner ? { opacity: '0' } : undefined}> {label}</div>}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        type={type || 'submit'}
        className={twMerge(clsx(buttonVariants({ variant, size }), className))}
        {...props}
      >
        {icon && (
          <div
            style={{ ..._icon.size, opacity: spinner ? '0' : '1' }}
            className="flex items-center justify-center"
          >
            <span style={_icon.scale} className="material-symbols-outlined">
              {icon}
            </span>
          </div>
        )}

        {label && <div style={spinner ? { opacity: '0' } : undefined}> {label}</div>}

        {spinner && (
          <div className="absolute">
            <CircleSpinner color={spinnerColor} size={_spinner} />
          </div>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
