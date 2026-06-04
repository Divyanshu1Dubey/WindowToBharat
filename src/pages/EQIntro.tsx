import { useNavigate } from "react-router-dom";
import { 
  Sparkles, 
  Heart, 
  Activity, 
  Eye, 
  Compass, 
  Sun, 
  ArrowRight,
  ShieldCheck,
  BrainCircuit
} from "lucide-react";

const EQIntro = () => {
  const navigate = useNavigate();

  const dimensions = [
    {
      icon: <Eye className="w-5 h-5 text-[#b77950]" />,
      name: "Emotional Awareness",
      desc: "How present are you with your inner world?",
      quote: "Awareness begins the moment you turn toward what you feel."
    },
    {
      icon: <Activity className="w-5 h-5 text-[#b77950]" />,
      name: "Emotional Regulation",
      desc: "What happens between feeling and reacting?",
      quote: "Balance is not in controlling emotions, but in allowing them to move."
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#b77950]" />,
      name: "Pattern Recognition",
      desc: "Can you see the story beneath your reactions?",
      quote: "Patterns are not problems — they are signals waiting to be seen."
    },
    {
      icon: <Heart className="w-5 h-5 text-[#b77950]" />,
      name: "Relational Intelligence",
      desc: "Who are you in the space between you and others?",
      quote: "The more you see yourself, the more clearly you can meet others."
    },
    {
      icon: <Compass className="w-5 h-5 text-[#b77950]" />,
      name: "Inner Alignment",
      desc: "Are you living from your truth — or your conditioning?",
      quote: "Alignment is when your inner and outer worlds begin to move together."
    },
    {
      icon: <Sun className="w-5 h-5 text-[#b77950]" />,
      name: "Resilience & Surrender",
      desc: "How do you meet life when it doesn't meet expectations?",
      quote: "True balance is not staying untouched — it is knowing how to return."
    }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
        fontFamily: "'Playfair Display', serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        overflowX: "hidden"
      }}
    >
      {/* Top Brand Tag */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
          animation: "fadeInDown 1s ease-out"
        }}
      >
        <Sparkles className="w-4 h-4 text-[#b77950]" />
        <span 
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "4px",
            fontSize: "13px",
            textTransform: "uppercase",
            color: "#b77950",
            fontWeight: "600"
          }}
        >
          Soulful Intelligence
        </span>
      </div>

      {/* Main Heading Block */}
      <div 
        style={{
          textAlign: "center",
          maxWidth: "800px",
          marginBottom: "50px",
          padding: "0 10px"
        }}
      >
        <h1
          style={{
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: "700",
            color: "#204e4a",
            lineHeight: "1.1",
            margin: "0 0 20px 0",
            letterSpacing: "-0.02em"
          }}
        >
          The EQ Audit
        </h1>
        
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "#666",
            lineHeight: "1.7",
            maxWidth: "640px",
            margin: "0 auto"
          }}
        >
          An invitation to turn inward. Discover the depth of your emotional intelligence through 6 distinct dimensions.
        </p>

        {/* Audit Stats pill */}
        <div 
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginTop: "30px",
            padding: "10px 24px",
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(8px)",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            fontSize: "14px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "500",
            color: "#444"
          }}
        >
          <span>48 Questions</span>
          <span style={{ color: "#d5b89c" }}>•</span>
          <span>6 Dimensions</span>
          <span style={{ color: "#d5b89c" }}>•</span>
          <span>Scored 1–10</span>
        </div>
      </div>

      {/* Dimensions Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          maxWidth: "1050px",
          width: "100%",
          marginBottom: "50px",
          padding: "0 10px"
        }}
      >
        {dimensions.map((dim, i) => (
          <div
            key={i}
            style={{
              background: "white",
              padding: "28px",
              borderRadius: "24px",
              boxShadow: "0 10px 30px rgba(183, 121, 80, 0.04)",
              border: "1px solid rgba(213, 184, 156, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
            className="hover:scale-[1.02] hover:shadow-lg"
          >
            <div 
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}
            >
              <div 
                style={{
                  background: "#fdf8f4",
                  padding: "10px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {dim.icon}
              </div>
              <h3 
                style={{
                  fontSize: "18px",
                  color: "#204e4a",
                  fontWeight: "600",
                  fontFamily: "'Poppins', sans-serif",
                  margin: 0
                }}
              >
                {dim.name}
              </h3>
            </div>
            
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "14px",
                color: "#666",
                margin: 0,
                lineHeight: "1.5"
              }}
            >
              {dim.desc}
            </p>
            
            <span
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "#999",
                marginTop: "auto",
                borderTop: "1px solid #f5eee6",
                paddingTop: "10px"
              }}
            >
              "{dim.quote}"
            </span>
          </div>
        ))}
      </div>

      {/* Info Notice */}
      <div 
        style={{
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "40px",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          color: "#888",
          lineHeight: "1.6",
          padding: "0 20px"
        }}
      >
        <p style={{ margin: 0 }}>
          "There is no need to rush through these. Let each question meet you where you are."
        </p>
      </div>

      {/* Begin CTA Button */}
      <button
        onClick={() => navigate("/user-details")}
        style={{
          padding: "20px 60px",
          borderRadius: "50px",
          border: "none",
          background: "linear-gradient(135deg, #204e4a 0%, #173835 100%)",
          color: "white",
          fontSize: "18px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(32, 78, 74, 0.25)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 15px 35px rgba(32, 78, 74, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 10px 30px rgba(32, 78, 74, 0.25)";
        }}
      >
        Begin Assessment
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* CSS Injection for custom hover classes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        .hover\\:scale-\\[1\\.02\\]:hover {
          transform: translateY(-4px);
        }
        .hover\\:shadow-lg:hover {
          box-shadow: 0 15px 35px rgba(183, 121, 80, 0.08);
          border-color: rgba(183, 121, 80, 0.3);
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EQIntro;
