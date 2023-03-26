import { Route, Routes } from "react-router-dom";
import Jobs from "../views/admin/Jobs";
import JobsDetail from "../views/admin/JobsDetail";
import Login from "../views/public/Login";
import PrivateRouter from "./PrivateRouter";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/jobs" element={<PrivateRouter element={<Jobs />} />} />
      <Route
        path="/jobs/:id"
        element={<PrivateRouter element={<JobsDetail />} />}
      />
    </Routes>
  );
};

export default Routers;
