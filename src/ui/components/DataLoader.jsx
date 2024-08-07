import { CircleSpinner } from 'react-spinners-kit';
import PropTypes from 'prop-types';
import useTheam from '../../hooks/useTheam';

DataLoader.propTypes = {
  data: PropTypes.node.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ]),
  options: PropTypes.shape({
    size: PropTypes.oneOf(['xs', 'sm', 'lg', 'base']),
    colSpan: PropTypes.number,
  }),
};

DataLoader.defaultProps = {
  isLoading: false,
  error: null,
  options: {},
};

function DataLoader({ data, isLoading, error, options }) {
  const theam = useTheam();
  let spinnerColor = theam === 'light' ? '#2563eb' : '#e2e8f0';

  const spinnerSizes = {
    xs: 16,
    sm: 20,
    lg: 40,
    default: 30,
  };
  const spinnerSize = spinnerSizes[options.size] || spinnerSizes.default;

  if (options.colSpan) {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={options?.colSpan || '10'}>
            <div className="flex w-full justify-center py-4">
              <CircleSpinner color={spinnerColor} size={spinnerSize} />
            </div>
          </td>
        </tr>
      );
    } else if (error) {
      return (
        <tr>
          <td colSpan={options?.colSpan || '10'}>
            <div
              className={`text-${options.size || 'base'} flex justify-center py-3 text-orange-500`}
            >
              {error?.message || error}
            </div>
          </td>
        </tr>
      );
    }
    return data;
  } else if (options.grid) {
    if (isLoading) {
      return (
        <div className=" col-span-full flex w-full justify-center py-4">
          <CircleSpinner color={spinnerColor} size={spinnerSize} />
        </div>
      );
    } else if (error) {
      return (
        <div
          className={`text-${options.size || 'base'}col-span-full flex justify-center py-3 text-orange-500`}
        >
          {error?.message || error}
        </div>
      );
    }
    return data;
  }

  if (isLoading) {
    return (
      <div className=" flex w-full justify-center py-4">
        <CircleSpinner color={spinnerColor} size={spinnerSize} />
      </div>
    );
  } else if (error) {
    return (
      <div className={`text-${options.size || 'base'} flex justify-center py-3 text-orange-500`}>
        {error?.message || error}
      </div>
    );
  }
  return data;
}

export default DataLoader;
