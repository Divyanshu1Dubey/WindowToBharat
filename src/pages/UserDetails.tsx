import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, ArrowLeft, ArrowRight } from "lucide-react";

const UserDetails = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", phone: "" };

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name";
      isValid = false;
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email address";
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number";
      isValid = false;
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number (7-15 digits)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = () => {
    if (validate()) {
      localStorage.setItem("eq-user", JSON.stringify(form));
      // Clear any previous quiz session to start fresh
      localStorage.removeItem("eq-quiz-progress");
      navigate("/assessment");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Back Link */}
      <button
        onClick={() => navigate("/EQIntro")}
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#b77950",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "transform 0.2s ease"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(-3px)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Intro
      </button>

      {/* Main Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          padding: "50px 40px",
          borderRadius: "32px",
          boxShadow: "0 20px 50px rgba(183, 121, 80, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          boxSizing: "border-box"
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "36px",
            color: "#204e4a",
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "12px",
            marginTop: 0
          }}
        >
          Before We Begin
        </h2>
        
        <p
          style={{
            fontSize: "14px",
            color: "#777",
            textAlign: "center",
            lineHeight: "1.6",
            marginBottom: "40px",
            maxWidth: "340px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          Your details are used solely to securely save your scoring profile to Google Sheets.
        </p>

        {/* Input Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "40px" }}>
          
          {/* Name Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={labelStyle}>Full Name</label>
            <div style={inputContainerStyle(!!errors.name)}>
              <User className="w-5 h-5" style={{ color: errors.name ? "#e06c75" : "#b77950" }} />
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                style={inputStyle}
              />
            </div>
            {errors.name && <span style={errorTextStyle}>{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputContainerStyle(!!errors.email)}>
              <Mail className="w-5 h-5" style={{ color: errors.email ? "#e06c75" : "#b77950" }} />
              <input
                type="email"
                placeholder="e.g. jane@example.com"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                style={inputStyle}
              />
            </div>
            {errors.email && <span style={errorTextStyle}>{errors.email}</span>}
          </div>

          {/* Phone Field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={labelStyle}>Phone Number</label>
            <div style={inputContainerStyle(!!errors.phone)}>
              <Phone className="w-5 h-5" style={{ color: errors.phone ? "#e06c75" : "#b77950" }} />
              <input
                type="tel"
                placeholder="e.g. +91 9876543210"
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: "" });
                }}
                style={inputStyle}
              />
            </div>
            {errors.phone && <span style={errorTextStyle}>{errors.phone}</span>}
          </div>

        </div>

        {/* Continue Button */}
        <button 
          onClick={handleContinue} 
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(32, 78, 74, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(32, 78, 74, 0.15)";
          }}
        >
          Begin Audit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const labelStyle = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#555",
  textTransform: "uppercase" as const,
  letterSpacing: "1px"
};

const inputContainerStyle = (hasError: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "white",
  padding: "4px 18px",
  borderRadius: "16px",
  border: hasError ? "1.5px solid rgba(224, 108, 117, 0.6)" : "1.5px solid rgba(213, 184, 156, 0.4)",
  boxShadow: hasError ? "0 0 10px rgba(224, 108, 117, 0.05)" : "0 4px 10px rgba(183, 121, 80, 0.02)",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
});

const inputStyle = {
  width: "100%",
  padding: "14px 0",
  border: "none",
  outline: "none",
  fontSize: "15px",
  color: "#333",
  background: "transparent",
  fontFamily: "inherit"
};

const errorTextStyle = {
  fontSize: "12px",
  color: "#e06c75",
  fontWeight: "500",
  marginLeft: "4px"
};

const buttonStyle = {
  width: "100%",
  padding: "18px",
  borderRadius: "50px",
  border: "none",
  background: "linear-gradient(135deg, #204e4a 0%, #173835 100%)",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 6px 20px rgba(32, 78, 74, 0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  fontFamily: "inherit"
};

export default UserDetails;
