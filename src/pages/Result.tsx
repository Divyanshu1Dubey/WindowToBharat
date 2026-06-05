import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  ArrowRight, 
  Settings, 
  Check, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Compass,
  MessageSquare,
  HelpCircle,
  Eye,
  Activity,
  Heart,
  BrainCircuit,
  Sun,
  Mail
} from "lucide-react";

interface ResultData {
  score: number;
  result: {
    title: string;
    reveals: string;
    wordForYou: string;
    pathForward: string;
    whyMatters: string;
  };
  dimensionScores?: Record<string, number>;
}

const Result = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ResultData | null>(null);
  
  // Google Sheets URL configuration state
  const [sheetUrl, setSheetUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const rawResult = localStorage.getItem("eq-result");
    if (rawResult) {
      setData(JSON.parse(rawResult));
    }

    const savedUrl = localStorage.getItem("eq-sheet-url") || "";
    setSheetUrl(savedUrl);
  }, []);

  const handleSaveUrl = () => {
    localStorage.setItem("eq-sheet-url", sheetUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  if (!data) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif"
        }}
      >
        <p style={{ color: "#666" }}>No assessment results found. Please take the assessment first.</p>
      </div>
    );
  }

  const score = data.score;
  const profile = data.result;
  const dimensionScores = data.dimensionScores || {};

  // Circumference calculation for SVG Circle (r=90)
  const r = 90;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (circumference * (score / 10));

  const dimensionMeta = [
    {
      name: "Emotional Awareness",
      desc: "How present you are with your inner world.",
      icon: <Eye className="w-4 h-4 text-[#b77950]" />
    },
    {
      name: "Emotional Regulation",
      desc: "What happens between feeling and reacting.",
      icon: <Activity className="w-4 h-4 text-[#b77950]" />
    },
    {
      name: "Pattern Recognition",
      desc: "Can you see the story beneath your reactions.",
      icon: <BrainCircuit className="w-4 h-4 text-[#b77950]" />
    },
    {
      name: "Relational Intelligence",
      desc: "Who you are in the space between you and others.",
      icon: <Heart className="w-4 h-4 text-[#b77950]" />
    },
    {
      name: "Inner Alignment",
      desc: "Living from your truth instead of conditioning.",
      icon: <Compass className="w-4 h-4 text-[#b77950]" />
    },
    {
      name: "Resilience & Surrender",
      desc: "How you meet life when it doesn't meet expectations.",
      icon: <Sun className="w-4 h-4 text-[#b77950]" />
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
        padding: "60px 20px",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          gap: "40px"
        }}
      >
        {/* Navigation & Title Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span 
            onClick={() => navigate("/")}
            style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "20px", 
              color: "#204e4a", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Window to <span style={{ color: "#ea580c" }}>Bharat</span>
          </span>

          <button
            onClick={() => navigate("/EQIntro")}
            style={{
              background: "white",
              padding: "10px 20px",
              borderRadius: "30px",
              border: "1px solid rgba(213, 184, 156, 0.4)",
              color: "#b77950",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            Retake Audit
          </button>
        </div>

        {/* Dashboard Grid Header (Circular Score + Overview Card) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "30px"
          }}
        >
          {/* Animated Score Gauge Card */}
          <div
            style={{
              background: "white",
              borderRadius: "32px",
              padding: "40px",
              boxShadow: "0 15px 40px rgba(183, 121, 80, 0.04)",
              border: "1px solid rgba(213, 184, 156, 0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <span style={{ fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#b77950", fontWeight: "600", marginBottom: "25px" }}>
              Overall EQ Score
            </span>
            
            <div style={{ position: "relative", width: "220px", height: "220px", marginBottom: "25px" }}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="90" fill="none" stroke="#f6ece0" strokeWidth="12" />
                <circle
                  cx="110"
                  cy="110"
                  r="90"
                  fill="none"
                  stroke="url(#eqGradient)"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 110 110)"
                  style={{
                    transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                />
                <defs>
                  <linearGradient id="eqGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#b77950" />
                    <stop offset="100%" stopColor="#204e4a" />
                  </linearGradient>
                </defs>
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "220px",
                  height: "220px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <span style={{ fontSize: "52px", fontWeight: "700", color: "#204e4a", fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                  {score}
                </span>
                <span style={{ fontSize: "14px", color: "#888", marginTop: "4px", fontWeight: "500" }}>
                  out of 10
                </span>
              </div>
            </div>

            <div style={{ background: "#fdf8f4", padding: "8px 18px", borderRadius: "20px", border: "1px solid rgba(183, 121, 80, 0.1)" }}>
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#b77950" }}>
                Level {score >= 9 ? "Benchmark" : "Growth Path"}
              </span>
            </div>
          </div>

          {/* Profile Overview Banner */}
          <div
            style={{
              background: "white",
              borderRadius: "32px",
              padding: "40px",
              boxShadow: "0 15px 40px rgba(183, 121, 80, 0.04)",
              border: "1px solid rgba(213, 184, 156, 0.2)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Sparkles className="w-5 h-5 text-[#b77950]" />
              <span style={{ fontSize: "13px", fontWeight: "600", textTransform: "uppercase", color: "#b77950", letterSpacing: "2px" }}>
                Result Profile
              </span>
            </div>
            
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "40px",
                color: "#204e4a",
                fontWeight: "700",
                margin: "0 0 15px 0",
                lineHeight: "1.1"
              }}
            >
              {profile.title}
            </h1>

            <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.7", margin: 0, fontStyle: "italic", borderLeft: "3px solid #b77950", paddingLeft: "15px" }}>
              "{profile.wordForYou}"
            </p>
          </div>
        </div>

        {/* Detailed Profile Breakdown Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#204e4a", fontWeight: "700", margin: "10px 0 0 0" }}>
            Profile Insight
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px"
            }}
          >
            {/* Email Sent Notification Card */}
            <div 
              style={{
                ...insightCardStyle,
                background: "#faf8f5",
                border: "1.5px dashed rgba(213, 184, 156, 0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "40px"
              }}
            >
              <div style={{ background: "#204e4a", padding: "16px", borderRadius: "50%", marginBottom: "20px", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 style={{ ...insightCardHeaderStyle, fontSize: "22px", marginBottom: "12px", textAlign: "center" }}>
                Analysis Sent to Email
              </h3>
              <p style={{ ...insightCardBodyStyle, fontSize: "14px", color: "#555", lineHeight: "1.6", maxWidth: "380px" }}>
                More information has been sent to your mail. Please see the brief description and personalized growth profile there.
              </p>
            </div>

            {/* Mindfulness Retreat Integration Card */}
            <div 
              style={{ 
                ...insightCardStyle, 
                background: "linear-gradient(135deg, #204e4a 0%, #153431 100%)",
                border: "none"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Calendar className="w-5 h-5 text-[#d5b89c]" />
                <span style={{ fontSize: "11px", fontWeight: "600", textTransform: "uppercase", color: "#d5b89c", letterSpacing: "2px" }}>
                  Zen Integration
                </span>
              </div>
              <h3 style={{ ...insightCardHeaderStyle, color: "white" }}>Mindfulness Retreat</h3>
              <p style={{ ...insightCardBodyStyle, color: "rgba(255,255,255,0.8)", marginBottom: "30px" }}>
                Deepen these exact emotional intelligence skills. Join EQ Practitioner <strong>Jestin Anthony</strong> in Dharamshala for a 5-day immersive wellness program.
              </p>
              <button
                onClick={() => navigate("/Mindfulness")}
                style={{
                  background: "linear-gradient(135deg, #d5b89c 0%, #b77950 100%)",
                  color: "white",
                  padding: "16px 28px",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "auto",
                  alignSelf: "flex-start",
                  boxShadow: "0 6px 15px rgba(183, 121, 80, 0.2)",
                  transition: "transform 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
              >
                Explore Retreat Program
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Dimensions Scoring Breakdown */}
        <div
          style={{
            background: "white",
            borderRadius: "32px",
            padding: "45px",
            boxShadow: "0 15px 40px rgba(183, 121, 80, 0.04)",
            border: "1px solid rgba(213, 184, 156, 0.2)"
          }}
        >
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#204e4a", fontWeight: "700", margin: "0 0 8px 0" }}>
            The 6 Dimensions of EQ
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "35px", maxWidth: "600px", lineHeight: "1.5" }}>
            Your rating in each area. A balanced score is achieved by nurturing the lowest scores to match your strongest capabilities.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            {dimensionMeta.map((dim, index) => {
              const scoreVal = dimensionScores[dim.name] || 5.0;
              const barPercent = (scoreVal / 10) * 100;
              
              return (
                <div
                  key={index}
                  style={{
                    background: "#faf8f5",
                    padding: "20px 24px",
                    borderRadius: "20px",
                    border: "1px solid rgba(213, 184, 156, 0.15)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ background: "white", padding: "6px", borderRadius: "8px", display: "flex" }}>
                      {dim.icon}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#555" }}>
                      Dimension {index + 1}
                    </span>
                  </div>
                  
                  <div style={{ marginTop: "4px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#204e4a", margin: 0 }}>
                      {dim.name}
                    </h4>
                    <p style={{ fontSize: "12px", color: "#888", margin: "2px 0 0 0", lineHeight: "1.4" }}>
                      {dim.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: "600", marginBottom: "6px" }}>
                      <span style={{ color: "#b77950" }}>Score</span>
                      <span style={{ color: "#204e4a" }}>{scoreVal} / 10</span>
                    </div>
                    <div style={{ width: "100%", height: "6px", background: "white", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(213,184,156,0.1)" }}>
                      <div
                        style={{
                          width: `${barPercent}%`,
                          height: "100%",
                          background: "linear-gradient(90deg, #b77950 0%, #204e4a 100%)",
                          borderRadius: "10px"
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Google Sheets Sync Settings Panel */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "24px",
            padding: "24px",
            border: "1px solid rgba(213, 184, 156, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "10px"
          }}
        >
          <div 
            onClick={() => setShowSettings(!showSettings)}
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              cursor: "pointer",
              userSelect: "none"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Settings className="w-5 h-5 text-[#b77950]" />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "#204e4a" }}>
                Developer/Sync Settings
              </span>
            </div>
            <span style={{ fontSize: "12px", color: "#b77950", fontWeight: "600" }}>
              {showSettings ? "Hide Options" : "Configure Google Sheets Sync"}
            </span>
          </div>

          {showSettings && (
            <div style={{ borderTop: "1px solid rgba(213, 184, 156, 0.15)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <p style={{ fontSize: "12px", color: "#666", lineHeight: "1.6", margin: 0 }}>
                To save audits automatically into your own Google Sheet:
                <br />
                1. Open Extensions &rarr; Apps Script inside your spreadsheet and paste the code from <code style={{ background: "#eee", padding: "2px 6px", borderRadius: "4px" }}>src/GoogleAppsScript.js</code>.
                <br />
                2. Deploy as a Web App (access: "Anyone").
                <br />
                3. Paste the Web App URL below:
              </p>
              
              <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "12px 18px",
                    borderRadius: "12px",
                    border: "1px solid rgba(213, 184, 156, 0.4)",
                    fontSize: "13px",
                    outline: "none",
                    color: "#333"
                  }}
                />
                
                <button
                  onClick={handleSaveUrl}
                  style={{
                    background: "#204e4a",
                    color: "white",
                    padding: "0 24px",
                    borderRadius: "12px",
                    border: "none",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved
                    </>
                  ) : "Save URL"}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// Styling structures
const insightCardStyle = {
  background: "white",
  borderRadius: "24px",
  padding: "32px",
  boxShadow: "0 10px 30px rgba(183, 121, 80, 0.02)",
  border: "1px solid rgba(213, 184, 156, 0.15)",
  display: "flex",
  flexDirection: "column" as const
};

const insightCardHeaderStyle = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "20px",
  color: "#204e4a",
  fontWeight: "700",
  margin: "0 0 16px 0"
};

const insightCardBodyStyle = {
  fontSize: "14px",
  color: "#666",
  lineHeight: "1.7",
  margin: 0
};

export default Result;
