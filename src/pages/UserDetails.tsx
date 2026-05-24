import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleContinue = () => {
    localStorage.setItem("eq-user", JSON.stringify(user));

    navigate("/assessment");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5eee6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "50px",
          borderRadius: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Before We Begin
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={user.phone}
          onChange={(e) =>
            setUser({
              ...user,
              phone: e.target.value,
            })
          }
          style={inputStyle}
        />

        <button onClick={handleContinue} style={buttonStyle}>
          Continue
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "15px",
  border: "1px solid #ddd",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "50px",
  border: "none",
  background: "#8b7355",
  color: "white",
  fontSize: "17px",
  cursor: "pointer",
};

export default UserDetails;
