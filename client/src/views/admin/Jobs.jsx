import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

const Jobs = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    Axios.get("http://localhost:5005/logout", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log(res);
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    handleGet();
  }, []);
  const handleGet = () => {
    const token = localStorage.getItem("token");
    Axios.get("http://localhost:5005/jobs", {
      headers: {
        Authorization: token
      }
    })
      .then((res) => {
        console.log(res);
        if (res.data.status) {
          setData(res.data.data);
        }
      })
      .catch((err) => alert(err));
  };
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div
        style={{
          width: "100%",
          background: "#0ba5e9",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "10px",
          gap: "5px"
        }}
      >
        <p
          style={{
            fontWeight: "800",
            color: "white",
            fontSize: "30px",
            margin: "0",
            padding: "0"
          }}
        >
          GitHub
        </p>
        <p
          style={{
            fontWeight: "300",
            color: "white",
            fontSize: "25px",
            margin: "0",
            padding: "0"
          }}
        >
          Jobs
        </p>
        <div
          style={{
            width: "100%",
            marginLeft: "1100px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingLeft: "20px"
          }}
          onClick={handleLogout}
        >
          <p style={{ cursor: "pointer" }}>Logout</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: "5px"
          }}
        >
          <p style={{ margin: "0", padding: "0" }}>Jobs Description</p>
          <input
            style={{ width: "300px", height: "30px", border: "2px solid #ddd" }}
            placeholder="Filter by title, benefits, companies, expertise"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            gap: "5px"
          }}
        >
          <p style={{ margin: "0", padding: "0" }}>Location</p>
          <input
            style={{ width: "300px", height: "30px", border: "2px solid #ddd" }}
            placeholder="Filter by city, state, zip code or country"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            height: "50px"
          }}
        >
          <input type="checkbox" />
          <p style={{ margin: 0, padding: 0 }}>Full Time Only</p>
        </div>{" "}
        <button
          style={{
            background: "#0ba5e9",
            width: "120px",
            height: "35px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "600",
            border: "none",
            outline: "none",
            marginTop: "15px"
          }}
        >
          Search
        </button>
      </div>

      <div
        style={{
          width: "98vw",
          border: "5px solid #ddd",
          padding: "10px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        <p style={{ fontSize: "25px", margin: 0, padding: 0, fontWeight: 600 }}>
          Jobs List
        </p>

        {/* Mapping Disini */}
        {data?.map((items, index) => {
          return (
            <div
              style={{ width: "100%" }}
              className="list-item-jobs"
              onClick={() => navigate(`/jobs/${items.id}`)}
            >
              <hr style={{ width: "100%" }} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "20px",
                      fontWeight: 600
                    }}
                  >
                    {items.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: "18px",
                      fontWeight: 300
                    }}
                  >
                    {items.company} -{" "}
                    <span style={{ color: "green", fontSize: "18px" }}>
                      {items.type}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    flexDirection: "column"
                  }}
                >
                  <p style={{ margin: 0, padding: 0 }}>{items.location}</p>
                  <p style={{ margin: 0, padding: 0 }}>{items.created_at}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jobs;
