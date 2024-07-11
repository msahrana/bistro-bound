import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../../hooks/useAuth/useAuth";

const PrivateRoute = ({children}) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate state={location?.pathname} to="/login" replace={true}></Navigate>
  );
};

export default PrivateRoute;
