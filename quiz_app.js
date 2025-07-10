import React, { useState, useEffect } from "react";

const quizData = [
  { question: "Is using strong, unique passwords important for security?", correct: true },
  { question: "Can clicking on unknown email attachments be dangerous?", correct: true },
  { question: "Is it safe to reuse the same password for multiple accounts?", correct: false },
];

export default function App() {
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [hacked, setHacked] = useState(false);

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes(null)) {
      alert("Please answer all questions!");
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      setHacked(true);
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
    }, 1000);
  };

  useEffect(() => {
    if (hacked) {
      document.body.classList.add("bg-black");
    }
  }, [hacked]);

  if (hacked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl text-red-600 font-bold animate-pulse">💀 YOU GOT HACKED!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">🔐 Security Quiz</h1>
        {quizData.map((item, index) => (
          <div key={index} className="mb-6">
            <p className="text-lg font-medium mb-2">{`Q${index + 1}: ${item.question}`}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(index, true)}
                className={`px-4 py-2 rounded-lg ${
                  answers[index] === true ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                True
              </button>
              <button
                onClick={() => handleAnswer(index, false)}
                className={`px-4 py-2 rounded-lg ${
                  answers[index] === false ? "bg-red-500 text-white" : "bg-gray-100"
                }`}
              >
                False
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
