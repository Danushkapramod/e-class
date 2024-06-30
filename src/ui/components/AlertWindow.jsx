import { useSelector } from "react-redux";
import Alert from "./Alert";

function AlertWindow() {
  const { alerts } = useSelector((state) => state.global);
  return (
    <div className="  absolute right-4 top-4 z-50">
      {alerts.map((alert, index) => {
        return (
          <Alert key={index} type={alert.type}>
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
}

export default AlertWindow;
