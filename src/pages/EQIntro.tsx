import { useNavigate } from "react-router-dom";

const EQIntro = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5eee6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        <p
          style={{
            letterSpacing: "4px",
            color: "#8b7355",
            marginBottom: "20px",
          }}
        >
          SOULFUL INTELLIGENCE
        </p>

        <h1
          style={{
            fontSize: "70px",
            color: "#2f2f2f",
            marginBottom: "20px",
          }}
        >
          The EQ Audit
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#666",
            lineHeight: "1.8",
            marginBottom: "50px",
          }}
        >
          48 Questions · 6 Dimensions · Emotional Intelligence Assessment
        </p>

        <button
          onClick={() => navigate("/user-details")}
          style={{
            padding: "18px 50px",
            borderRadius: "50px",
            border: "none",
            background: "#8b7355",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Begin Assessment
        </button>
      </div>
    </div>
  );
};

export default EQIntro;
