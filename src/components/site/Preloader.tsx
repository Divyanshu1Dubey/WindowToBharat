import { useState, useEffect } from "react";

export const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Elegant dynamic increment speed (faster at first, slows down near completion)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        let increment = 0;
        if (prev < 30) {
          increment = Math.floor(Math.random() * 8) + 4; // Faster early on
        } else if (prev < 75) {
          increment = Math.floor(Math.random() * 5) + 2; // Steady progress
        } else {
          increment = Math.floor(Math.random() * 2) + 1; // Slow and satisfying final calibration
        }
        
        return Math.min(prev + increment, 100);
      });
    }, 60);

    // End preloader when progress hits 100%
    const timeout = setTimeout(() => {
      setFade(true);
      const hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 900); // Elegant slow fade-out & slide-up
      return () => clearTimeout(hideTimeout);
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  // Premium narratives that change dynamically with the progress percentage
  let statusText = "Gathering ancient whispers...";
  if (progress >= 30 && progress < 55) {
    statusText = "Crafting signature journeys...";
  } else if (progress >= 55 && progress < 80) {
    statusText = "Aligning body, mind, and spirit...";
  } else if (progress >= 80 && progress < 95) {
    statusText = "Calibrating the portal to Bharat...";
  } else if (progress >= 95) {
    statusText = "Welcome to Window to Bharat.";
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#080f0d", // Extremely premium, deeper forest black
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.9s cubic-bezier(0.76, 0, 0.24, 1), transform 0.9s cubic-bezier(0.76, 0, 0.24, 1), filter 0.9s ease-out",
        opacity: fade ? 0 : 1,
        transform: fade ? "translateY(-40px) scale(1.02)" : "translateY(0) scale(1)",
        filter: fade ? "blur(12px)" : "none",
        pointerEvents: fade ? "none" : "auto",
        overflow: "hidden",
      }}
    >
      {/* Styles Injection */}
      <style>{`
        @keyframes ambient-pulse {
          0%, 100% {
            transform: scale(1) translate(0px, 0px);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.15) translate(10px, -20px);
            opacity: 0.35;
          }
        }
        @keyframes float-logo {
          0%, 100% {
            transform: translateY(0px) rotateX(8deg) rotateY(-8deg);
          }
          50% {
            transform: translateY(-12px) rotateX(12deg) rotateY(8deg);
          }
        }
        @keyframes border-shimmer {
          0% { border-color: rgba(213, 184, 156, 0.2); }
          50% { border-color: rgba(234, 88, 12, 0.45); }
          100% { border-color: rgba(213, 184, 156, 0.2); }
        }
        @keyframes premium-glow {
          0%, 100% {
            box-shadow: 0 15px 45px -15px rgba(234, 88, 12, 0.15), 0 15px 45px -15px rgba(32, 78, 74, 0.15);
          }
          50% {
            box-shadow: 0 25px 60px -10px rgba(234, 88, 12, 0.35), 0 25px 60px -10px rgba(32, 78, 74, 0.35);
          }
        }
        @keyframes float-particle-premium {
          0% {
            transform: translateY(0px) translateX(0px) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-120px) translateX(30px) scale(1.1);
            opacity: 0;
          }
        }
        .animate-ambient-glow {
          animation: ambient-pulse 6s ease-in-out infinite;
        }
        .glass-logo-card {
          animation: float-logo 4.5s ease-in-out infinite, border-shimmer 4.5s ease-in-out infinite, premium-glow 4.5s ease-in-out infinite;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>

      {/* Background Radial Glow */}
      <div 
        className="animate-ambient-glow"
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(234, 88, 12, 0.14) 0%, rgba(32, 78, 74, 0.18) 55%, transparent 100%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Floating 3D Sparkle Particles */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${Math.random() * 5 + 3}px`,
            height: `${Math.random() * 5 + 3}px`,
            borderRadius: "50%",
            background: i % 2 === 0 ? "linear-gradient(135deg, #ea580c, #d5b89c)" : "linear-gradient(135deg, #204e4a, #d5b89c)",
            filter: "blur(0.5px)",
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 70 + 20}%`,
            animation: `float-particle-premium ${Math.random() * 5 + 5}s infinite linear`,
            animationDelay: `${Math.random() * 4}s`,
            zIndex: 1,
          }}
        />
      ))}

      {/* 3D Content Wrapper */}
      <div
        style={{
          perspective: "1500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "45px",
          zIndex: 2,
        }}
      >
        {/* Glassmorphic & 3D Logo Card */}
        <div
          className="glass-logo-card"
          style={{
            background: "rgba(255, 255, 255, 0.96)",
            padding: "26px 42px",
            borderRadius: "32px",
            border: "1.5px solid rgba(213, 184, 156, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "340px",
            width: "85vw",
            backdropFilter: "blur(12px)",
          }}
        >
          <img
            src="/Window_To_Bharat - Copy.png"
            alt="Window to Bharat Logo"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              backfaceVisibility: "hidden",
              filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.03))",
            }}
          />
        </div>

        {/* Loading details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "260px",
            marginTop: "10px",
          }}
        >
          {/* Narrative status message */}
          <span
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "1.5px",
              textAlign: "center",
              marginBottom: "16px",
              fontFamily: "'Inter', sans-serif",
              height: "18px",
              transition: "all 0.3s ease",
            }}
          >
            {statusText}
          </span>

          {/* Progress bar container */}
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          >
            {/* Progress bar fill */}
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #ea580c 0%, #d5b89c 50%, #204e4a 100%)",
                borderRadius: "20px",
                transition: "width 0.15s cubic-bezier(0.1, 0.8, 0.25, 1)",
                boxShadow: "0 0 12px rgba(234, 88, 12, 0.7)",
              }}
            />
          </div>

          {/* Progress Percent */}
          <span
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#d5b89c",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: "12px",
              fontFamily: "'Inter', sans-serif",
              opacity: 0.8,
            }}
          >
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
