import { Navigate } from "react-router-dom";

export const NoAuthGuard = ({ Child }: { Child: React.FC }): JSX.Element => {
  const user = localStorage.getItem("user");

  return user ? <Navigate to="/dashboard" /> : <Child />;
};
