import { useNavigate } from "react-router-dom";
import Spinner from "../ui/components/Spinner";
import { useAuther } from "./useAuther";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, auther } = useAuther();
  let isAuthenticated = auther;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
