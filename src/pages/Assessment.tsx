import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import { results } from "../data/results";
import { ArrowLeft, RotateCcw, Loader2 } from "lucide-react";

// You can configure your Google Apps Script URL here or set it in the UI settings
const DEFAULT_GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwEuXD1MiMx_bruXd98V8nMkFEWlSluWXt7CchGooMCXhePEjo57KdOAq03TwN6x7TKUA/exec";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem("eq-quiz-progress");
    if (savedProgress) {
      try {
        const { currentQuestion: savedIndex, answers: savedAnswers } = JSON.parse(savedProgress);
        if (typeof savedIndex === "number" && Array.isArray(savedAnswers)) {
          setCurrentQuestion(savedIndex);
          setAnswers(savedAnswers);
        }
      } catch (e) {
        console.error("Failed to restore progress", e);
      }
    }
  }, []);

  // Save progress whenever state changes
  const saveProgress = (index: number, updatedAnswers: number[]) => {
    localStorage.setItem(
      "eq-quiz-progress",
      JSON.stringify({ currentQuestion: index, answers: updatedAnswers })
    );
  };

  const handleAnswer = (score: number, optionIndex: number) => {
    setSelectedOption(optionIndex);

    // Small delay to make the selection animation feel premium and deliberate
    setTimeout(() => {
      const updated = [...answers];
      updated[currentQuestion] = score;
      setAnswers(updated);
      setSelectedOption(null);

      if (currentQuestion < questions.length - 1) {
        const nextIndex = currentQuestion + 1;
        setCurrentQuestion(nextIndex);
        saveProgress(nextIndex, updated);
      } else {
        // Remove progress cache once finished
        localStorage.removeItem("eq-quiz-progress");
        showResult(updated);
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const prevIndex = currentQuestion - 1;
      setCurrentQuestion(prevIndex);
      // Remove last answered value
      const updated = answers.slice(0, prevIndex);
      setAnswers(updated);
      saveProgress(prevIndex, updated);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the assessment and start over?")) {
      setCurrentQuestion(0);
      setAnswers([]);
      localStorage.removeItem("eq-quiz-progress");
    }
  };

  const showResult = async (allAnswers: number[]) => {
    setIsSubmitting(true);

    const total = allAnswers.reduce((a, b) => a + b, 0);
    const average = total / questions.length;
    const finalScore = Number((average * 2).toFixed(1));

    // Calculate Dimension Scores (1-10 scale)
    const dimensions = [
      "Emotional Awareness",
      "Emotional Regulation",
      "Pattern Recognition",
      "Relational Intelligence",
      "Inner Alignment",
      "Resilience & Surrender",
    ];

    const dimensionScores: Record<string, number> = {};

    dimensions.forEach((dim) => {
      const dimQuestions = questions.filter((q) => q.dimension === dim);
      const dimScores = dimQuestions.map((dq) => {
        const idx = questions.findIndex((q) => q.id === dq.id);
        return allAnswers[idx] !== undefined ? allAnswers[idx] : 3; // default fallback
      });
      const dimAvg = dimScores.reduce((a, b) => a + b, 0) / dimQuestions.length;
      dimensionScores[dim] = Number((dimAvg * 2).toFixed(1));
    });

    const matchedResult = results.find(
      (r) => finalScore >= r.min && finalScore <= r.max
    ) || results[0];

    // Store in localStorage
    localStorage.setItem(
      "eq-result",
      JSON.stringify({
        score: finalScore,
        result: matchedResult,
        dimensionScores,
      })
    );

    const user = JSON.parse(localStorage.getItem("eq-user") || "{}");
    const scriptUrl = DEFAULT_GOOGLE_SCRIPT_URL;

    if (scriptUrl) {
      try {
        // Send data directly to Google Sheets Apps Script Web App
        await fetch(scriptUrl, {
          method: "POST",
          mode: "no-cors", // Crucial for direct Apps Script posting to bypass redirect CORS issues
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "eq_audit",
            name: user.name || "Anonymous",
            email: user.email || "N/A",
            phone: user.phone || "N/A",
            score: finalScore,
            resultTitle: matchedResult.title,
            wordForYou: matchedResult.wordForYou,
            reveals: matchedResult.reveals,
            pathForward: matchedResult.pathForward,
            whyMatters: matchedResult.whyMatters,
            dimensionScores,
          }),
        });
      } catch (error) {
        console.error("Failed to upload to Google Sheets:", error);
      }
    } else {
      console.log("No Google Sheet script URL defined. Result saved locally.", {
        name: user.name,
        email: user.email,
        phone: user.phone,
        score: finalScore,
        resultTitle: matchedResult.title,
        dimensionScores,
      });
    }

    setIsSubmitting(false);
    navigate("/result");
  };

  const question = questions[currentQuestion];
  const optionLetters = ["A", "B", "C", "D", "E"];

  if (isSubmitting) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
          padding: "20px"
        }}
      >
        <Loader2 className="w-12 h-12 text-[#204e4a] animate-spin mb-4" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#204e4a", marginBottom: "8px" }}>
          Generating Profile
        </h2>
        <p style={{ color: "#666", fontSize: "15px", textAlign: "center", maxWidth: "340px", lineHeight: "1.6" }}>
          Securing your emotional alignment metrics and saving your dashboard context...
        </p>
      </div>
    );
  }

  // Get progress percentage
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fbfaf8 0%, #f5e6d3 50%, #fbfaf8 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "24px"
        }}
      >
        {/* Top bar with back and reset */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: currentQuestion === 0 ? "#ccc" : "#b77950",
              fontSize: "14px",
              fontWeight: "600",
              cursor: currentQuestion === 0 ? "default" : "pointer",
              transition: "transform 0.2s ease, color 0.2s ease",
              opacity: currentQuestion === 0 ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (currentQuestion > 0) e.currentTarget.style.transform = "translateX(-3px)";
            }}
            onMouseLeave={(e) => {
              if (currentQuestion > 0) e.currentTarget.style.transform = "none";
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Question
          </button>

          <button
            onClick={handleReset}
            style={{
              background: "none",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#999",
              fontSize: "13px",
              cursor: "pointer",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#666"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Audit
          </button>
        </div>

        {/* Progress Bar Header */}
        <div style={{ background: "white", padding: "20px 30px", borderRadius: "20px", boxShadow: "0 4px 15px rgba(183, 121, 80, 0.02)", border: "1px solid rgba(213, 184, 156, 0.15)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#b77950", textTransform: "uppercase", letterSpacing: "1px" }}>
              {question.dimension}
            </span>
            <span style={{ fontSize: "13px", color: "#666", fontWeight: "500" }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div style={{ width: "100%", height: "6px", background: "#f0ebe4", borderRadius: "10px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: "linear-gradient(90deg, #b77950 0%, #204e4a 100%)",
                borderRadius: "10px",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(20px)",
            padding: "50px",
            borderRadius: "32px",
            boxShadow: "0 20px 50px rgba(183, 121, 80, 0.06)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box"
          }}
        >
          {/* Subtitle / Insight */}
          <span
            style={{
              fontSize: "14px",
              fontStyle: "italic",
              color: "#888",
              marginBottom: "20px",
              lineHeight: "1.6"
            }}
          >
            "{question.subtitle}"
          </span>

          {/* Actual Question Text */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 3.5vw, 30px)",
              color: "#204e4a",
              lineHeight: "1.4",
              fontWeight: "600",
              margin: "0 0 40px 0"
            }}
          >
            {question.question}
          </h2>

          {/* Option Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {question.options.map((option, index) => {
              const isSelected = selectedOption === index;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.score, index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    width: "100%",
                    padding: "20px 24px",
                    background: isSelected ? "#fdfaf6" : "white",
                    border: isSelected 
                      ? "1.5px solid #b77950" 
                      : "1.5px solid rgba(213, 184, 156, 0.3)",
                    borderRadius: "18px",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "15px",
                    color: "#3d3d3d",
                    fontFamily: "inherit",
                    fontWeight: "500",
                    transition: "transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease",
                    boxShadow: isSelected ? "0 4px 15px rgba(183, 121, 80, 0.05)" : "none",
                    transform: isSelected ? "scale(0.99)" : "none",
                    outline: "none"
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "#b77950";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.backgroundColor = "#fffdfb";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(213, 184, 156, 0.3)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.backgroundColor = "white";
                    }
                  }}
                >
                  {/* Letter bubble */}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: isSelected ? "#b77950" : "#f7f5f2",
                      color: isSelected ? "white" : "#666",
                      fontSize: "13px",
                      fontWeight: "600",
                      flexShrink: 0,
                      transition: "background-color 0.15s ease, color 0.15s ease"
                    }}
                  >
                    {optionLetters[index]}
                  </span>
                  
                  <span style={{ lineHeight: "1.5" }}>{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
