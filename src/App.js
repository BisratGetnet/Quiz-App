import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const questions = [
    {
      imageUrl: 'Q1.jpg',
      questionText: 'Solve the problem shown in the figure below?',
      answerOptions: [
        { answerText: '100', isCorrect: false },
        { answerText: '200', isCorrect: false },
        { answerText: '300', isCorrect: false },
        { answerText: '250', isCorrect: true },
        { answerText: 'None', isCorrect: false },
      ],
    },
    {
      imageUrl: 'Q4.jpg',
      questionText: 'Where is the Golden Gate Bridge?',
      answerOptions: [
        { answerText: 'Arizona', isCorrect: false },
        { answerText: 'Florida', isCorrect: false },
        { answerText: 'Texas', isCorrect: false },
        { answerText: 'California', isCorrect: true },
        { answerText: 'Other', isCorrect: false },
      ],
    },
    {
      imageUrl: 'Q2.jpg',
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Dublin', isCorrect: false },
        { answerText: 'Other', isCorrect: false },
      ],
    },
    {
      imageUrl: 'Q3.png',
      questionText: 'What is the capital of Ethiopia?',
      answerOptions: [
        { answerText: 'Bahir Dar', isCorrect: false },
        { answerText: 'Mekele', isCorrect: false },
        { answerText: 'Gonder', isCorrect: false },
        { answerText: 'Other', isCorrect: false },
        { answerText: 'Addis Ababa', isCorrect: true },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const handleAnswerOptionClick = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestion].answerOptions[selectedOptionIndex].isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOptionIndex(null);
    } else {
      const endTime = new Date();
      setTimeTaken((endTime - startTime) / 1000);
      setShowScore(true);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setStartTime(new Date());
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      {!quizStarted ? (
        <div className="text-center">
          <button className="btn btn-primary btn-lg" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="text-center">
          <h2 className="text-success">You scored {score} / {questions.length}</h2>
          <p>Time taken: {timeTaken} seconds.</p>
        </div>
      ) : (
        <div className="card col-md-8 shadow-lg">
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <h5>Question {currentQuestion + 1}</h5>
            <h5 class='mx-5'>{questions[currentQuestion].questionText}</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img
                  src={questions[currentQuestion].imageUrl}
                  alt="Question"
                  className="img-fluid rounded"
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <div className="col-md-6 d-flex flex-column justify-content-between">
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(index)}
                    className={`btn ${selectedOptionIndex === index ? 'btn-info' : 'btn-outline-primary'} my-2 text-left`}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-danger"
                onClick={handleNextQuestion}
                disabled={selectedOptionIndex === null}
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}