import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRouter = ({ element }) => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");
  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return <>{element}</>;
};

export default PrivateRouter;
