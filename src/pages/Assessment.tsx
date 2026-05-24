// ======================================
// src/pages/Assessment.tsx
// ======================================

import { useState } from "react";
import { questions } from "../data/questions";
import { results } from "../data/results";

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<number[]>([]);

  const question = questions[currentQuestion];

  const handleAnswer = (score: number) => {
    const updated = [...answers, score];

    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      showResult(updated);
    }
  };

  const showResult = async (allAnswers: number[]) => {
    const total = allAnswers.reduce((a, b) => a + b, 0);

    const average = total / questions.length;

    const finalScore = Number((average * 2).toFixed(1));

    const matchedResult = results.find(
      (r) => finalScore >= r.min && finalScore <= r.max,
    );

    localStorage.setItem(
      "eq-result",
      JSON.stringify({
        score: finalScore,
        result: matchedResult,
      }),
    );

    const user = JSON.parse(localStorage.getItem("eq-user") || "{}");

    // SHEET DB API

    await fetch("YOUR_SHEETDB_API", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        data: [
          {
            name: user.name,
            email: user.email,
            phone: user.phone,
            score: finalScore,
            result: matchedResult?.title,
          },
        ],
      }),
    });

    window.location.href = "/result";
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
          maxWidth: "900px",
        }}
      >
        {/* Progress */}

        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <p
            style={{
              color: "#8b7355",
              marginBottom: "10px",
            }}
          >
            Question {currentQuestion + 1} / {questions.length}
          </p>

          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#ddd",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "#8b7355",
                borderRadius: "20px",
              }}
            />
          </div>
        </div>

        {/* Card */}

        <div
          style={{
            background: "white",
            padding: "60px",
            borderRadius: "30px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              color: "#8b7355",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            {question.dimension}
          </p>

          <h1
            style={{
              fontSize: "18px",
              color: "#777",
              marginBottom: "25px",
            }}
          >
            {question.subtitle}
          </h1>

          <h2
            style={{
              fontSize: "38px",
              lineHeight: "1.5",
              marginBottom: "50px",
              color: "#2f2f2f",
            }}
          >
            {question.question}
          </h2>

          {question.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleAnswer(option.score)}
              style={{
                padding: "22px",
                border: "1px solid #e7e7e7",
                borderRadius: "18px",
                marginBottom: "18px",
                cursor: "pointer",
                transition: "0.3s",
                background: "#fff",
              }}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
