import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading";
function GuestRoute({ children }) {
  const { isInitialize, isAuth } = useAuth();
  console.log(isInitialize, isAuth);
  if (!isInitialize) return <Loading />;
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default GuestRoute;
