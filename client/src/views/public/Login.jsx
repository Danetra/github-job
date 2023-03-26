import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import Axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5005/login", {
      username: formData.username,
      password: formData.password
    })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data.data.token}`);
        navigate("/jobs");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          width: "400px",
          height: "500px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <img src={logo} alt="logo" />
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "10px"
          }}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              height: "35px",
              width: "300px",
              paddingLeft: "20px"
            }}
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              height: "35px",
              width: "300px",
              paddingLeft: "20px"
            }}
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            style={{
              background: "#0ba5e9",
              width: "320px",
              height: "35px",
              borderRadius: "10px",
              color: "white",
              fontWeight: "600",
              border: "none",
              outline: "none"
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
