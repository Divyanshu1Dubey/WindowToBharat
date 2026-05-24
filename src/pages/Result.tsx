// ======================================
// src/pages/Result.tsx
// ======================================

const Result = () => {
  const data = JSON.parse(localStorage.getItem("eq-result") || "{}");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5eee6",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "white",
          padding: "60px",
          borderRadius: "30px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            letterSpacing: "3px",
            color: "#8b7355",
            marginBottom: "20px",
          }}
        >
          YOUR EQ RESULT
        </p>

        <div
          style={{
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "10px solid #8b7355",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 40px",
            fontSize: "60px",
            fontWeight: "bold",
            color: "#2f2f2f",
          }}
        >
          {data.score}
        </div>

        <h1
          style={{
            fontSize: "50px",
            marginBottom: "25px",
            color: "#2f2f2f",
          }}
        >
          {data.result?.title}
        </h1>

        <p
          style={{
            fontStyle: "italic",
            color: "#777",
            marginBottom: "30px",
            fontSize: "20px",
          }}
        >
          "{data.result?.quote}"
        </p>

        <p
          style={{
            fontSize: "20px",
            lineHeight: "1.9",
            marginBottom: "40px",
            color: "#555",
          }}
        >
          {data.result?.description}
        </p>

        <div
          style={{
            background: "#f8f4ef",
            padding: "30px",
            borderRadius: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "15px",
            }}
          >
            Your Path Forward
          </h3>

          <p
            style={{
              lineHeight: "1.8",
              color: "#666",
            }}
          >
            {data.result?.path}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
