import { Navigate } from "react-router-dom";

export const AuthGuard = ({ Child }: { Child: React.FC }): JSX.Element => {
  const user = localStorage.getItem("user");

  return user ? <Child /> : <Navigate to="/" />;
};
