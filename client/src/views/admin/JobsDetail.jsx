import { useNavigate, useParams } from "react-router-dom";
import logo from "../../logo.svg";
import Axios from "axios";
import { useState, useEffect } from "react";

const JobsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    handleDetail();
  }, []);
  const handleDetail = () => {
    const token = localStorage.getItem("token");
    Axios.get(`http://localhost:5005/jobs/detail/${id}`, {
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
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingLeft: "20px"
        }}
        onClick={() => navigate("/jobs")}
      >
        <p style={{ cursor: "pointer" }}>Back</p>
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
              color: "gray",
              fontSize: "14px"
            }}
          >
            {data.type} / {data.location}
          </p>
          <p
            style={{
              margin: 0,
              padding: 0,
              fontSize: "20px",
              fontWeight: "600"
            }}
          >
            {data.title}
          </p>
        </div>
        <hr style={{ width: "100%" }} />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Disini mapping description */}
          <div
            stlye={{ width: "80%" }}
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
          <div>
            <div
              style={{
                width: "300px",
                border: "5px solid #ddd",
                borderRadius: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <p style={{ paddingLeft: "10px" }}>{data.company}</p>
                <p
                  style={{
                    margin: 0,
                    padding: "5px",
                    background: "#ddd",
                    color: "blue",
                    fontSize: "14px",
                    borderRadius: "5px",
                    marginRight: "10px"
                  }}
                >
                  1 other jobs
                </p>
              </div>
              <hr style={{ width: "100%", margin: 0, padding: 0 }} />
              <img
                src={data.company_logo}
                alt="company"
                style={{ width: "200px" }}
              />
              <a href="www.react.dev">www.react.dev</a>
            </div>
            <div
              style={{
                width: "300px",
                border: "5px solid #dadabc",
                borderRadius: "10px",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                background: "#fefebf"
              }}
            >
              <p style={{ margin: 0, padding: 10, fontWeight: 600 }}>
                How to apply
              </p>

              <hr style={{ width: "100%", margin: 0, padding: 0 }} />

              <div
                dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsDetail;
