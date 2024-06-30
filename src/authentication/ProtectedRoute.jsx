import { useNavigate } from "react-router-dom";
import Spinner from "../ui/components/Spinner";
import { useUser } from "./useUser";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  let isAuthenticated = user?.role === "authenticated";

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
