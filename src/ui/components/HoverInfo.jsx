import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Tooltip from './Potral';

const HoverInfoContext = createContext();

function HoverInfoProvider({ children }) {
  const [tooltipData, setTooltipData] = useState({ position: '' });

  function showTooltip(event) {
    const rect = event.target.getBoundingClientRect();
    setTooltipData({
      position: {
        top: rect.top + window.scrollY + rect.height,
        left: rect.left + window.scrollX + rect.width,
      },
    });
  }

  return (
    <HoverInfoContext.Provider value={{ tooltipData, showTooltip, setTooltipData }}>
      {children}
    </HoverInfoContext.Provider>
  );
}

function Icon({ children }) {
  const { setTooltipData, showTooltip } = useContext(HoverInfoContext);
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    function handleMouseEnter(event) {
      showTooltip(event);
    }
    function handleMouseLeave() {
      setTooltipData(null);
    }
    if (element) {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [setTooltipData, showTooltip]);
  return <div ref={ref}>{children}</div>;
}

function Content({ children }) {
  const { tooltipData } = useContext(HoverInfoContext);
  return tooltipData && <Tooltip position={tooltipData.position}>{children}</Tooltip>;
}

function HoverInfo({ children }) {
  return <HoverInfoProvider>{children}</HoverInfoProvider>;
}

HoverInfo.Icon = Icon;
HoverInfo.Content = Content;

export default HoverInfo;
