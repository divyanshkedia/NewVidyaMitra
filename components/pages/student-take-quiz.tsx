'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, AlertCircle } from 'lucide-react'

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
}

interface StudentTakeQuizProps {
  quizId: number
  onBack: () => void
}

interface QuestionTiming {
  questionId: number
  timeSpent: number
}

export default function StudentTakeQuiz({ quizId, onBack }: StudentTakeQuizProps) {
  const quizzes: Record<number, { title: string; timeLimit: number; questions: Question[] }> = {
    1: {
      title: 'Physics Fundamentals',
      timeLimit: 30,
      questions: [
        {
          id: 1,
          text: 'What is the SI unit of force?',
          options: ['Kilogram', 'Newton', 'Joule', 'Watt'],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: 'At what temperature does water boil?',
          options: ['90°C', '100°C', '110°C', '120°C'],
          correctAnswer: 1,
        },
        {
          id: 3,
          text: 'What is the speed of light?',
          options: ['3 × 10^8 m/s', '3 × 10^9 m/s', '3 × 10^7 m/s', '3 × 10^6 m/s'],
          correctAnswer: 0,
        },
      ],
    },
    2: {
      title: 'Chemistry Basics',
      timeLimit: 25,
      questions: [
        {
          id: 1,
          text: 'What is the atomic number of Carbon?',
          options: ['4', '6', '8', '12'],
          correctAnswer: 1,
        },
        {
          id: 2,
          text: 'Which is the most abundant gas in atmosphere?',
          options: ['Oxygen', 'Nitrogen', 'Argon', 'Hydrogen'],
          correctAnswer: 1,
        },
      ],
    },
    3: {
      title: 'Biology Concepts',
      timeLimit: 20,
      questions: [
        {
          id: 1,
          text: 'What is the basic unit of life?',
          options: ['Atom', 'Molecule', 'Cell', 'Organ'],
          correctAnswer: 2,
        },
        {
          id: 2,
          text: 'How many chambers does the human heart have?',
          options: ['2', '3', '4', '6'],
          correctAnswer: 2,
        },
      ],
    },
    4: {
      title: 'Mathematics Algebra',
      timeLimit: 40,
      questions: [
        {
          id: 1,
          text: 'Solve: 2x + 5 = 13',
          options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
          correctAnswer: 2,
        },
        {
          id: 2,
          text: 'What is the slope of y = 2x + 3?',
          options: ['2', '3', '5', '-2'],
          correctAnswer: 0,
        },
      ],
    },
  }

  const quiz = quizzes[quizId]
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1))
  const [submitted, setSubmitted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit * 60)
  const [questionTimings, setQuestionTimings] = useState<QuestionTiming[]>(
    quiz.questions.map(q => ({ questionId: q.id, timeSpent: 0 }))
  )
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [timeUp, setTimeUp] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setTimeUp(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const question = quiz.questions[currentQuestion]

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)
    const updatedTimings = [...questionTimings]
    updatedTimings[currentQuestion].timeSpent = timeSpent
    setQuestionTimings(updatedTimings)
    setQuestionStartTime(Date.now())

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)
    const updatedTimings = [...questionTimings]
    updatedTimings[currentQuestion].timeSpent = timeSpent
    setQuestionTimings(updatedTimings)
    setQuestionStartTime(Date.now())

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)
    const updatedTimings = [...questionTimings]
    updatedTimings[currentQuestion].timeSpent = timeSpent
    setQuestionTimings(updatedTimings)
    setSubmitted(true)
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (timeUp && !submitted) {
    handleSubmit()
  }

  if (submitted) {
    const score = calculateScore()
    const percentage = Math.round((score / quiz.questions.length) * 100)
    const totalTimeSpent = questionTimings.reduce((sum, t) => sum + t.timeSpent, 0)

    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-2xl bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">{quiz.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-400 mb-4">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-2xl font-semibold text-white mb-2">Quiz Complete!</p>
              <p className="text-slate-400">
                You scored {percentage}% on this quiz
              </p>
              <p className="text-slate-400 text-sm mt-4 flex items-center justify-center gap-2">
                <Clock size={16} />
                Total time: {formatTime(totalTimeSpent)}
              </p>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-white mb-4">Answer Review</h3>
              {quiz.questions.map((q, index) => {
                const isCorrect = answers[index] === q.correctAnswer
                const timeForQuestion = questionTimings[index]?.timeSpent || 0
                return (
                  <div key={q.id} className="border-b border-slate-600 pb-4 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-slate-400">Question {index + 1}</p>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock size={14} />
                        {formatTime(timeForQuestion)}
                      </span>
                    </div>
                    <p className="text-white font-medium mb-2">{q.text}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span
                        className={`px-2 py-1 rounded ${
                          isCorrect
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                      <span className="text-slate-400">
                        Your answer: <span className="text-white">{q.options[answers[index]]}</span>
                      </span>
                      {!isCorrect && (
                        <span className="text-slate-400 ml-auto">
                          Correct: <span className="text-emerald-400">{q.options[q.correctAnswer]}</span>
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              onClick={onBack}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Back to Quizzes
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isTimeWarning = timeRemaining < 60
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">{quiz.title}</h2>
          <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-4">
            <div>
              <p className="text-sm text-slate-400">Progress</p>
              <p className="text-2xl font-bold text-white">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <div className="w-48 bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isTimeWarning ? 'bg-red-500/20 text-red-300' : 'bg-slate-700'
            }`}>
              <Clock size={18} />
              <span className="font-bold text-lg">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          {isTimeWarning && (
            <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300">
              <AlertCircle size={18} />
              <span className="text-sm">Time is running out!</span>
            </div>
          )}
        </div>

        {/* Question Navigation Grid */}
        <div className="mb-8 p-4 bg-slate-700/30 rounded-lg">
          <p className="text-sm text-slate-400 mb-3">Jump to question:</p>
          <div className="grid grid-cols-10 gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)
                  const updatedTimings = [...questionTimings]
                  updatedTimings[currentQuestion].timeSpent = timeSpent
                  setQuestionTimings(updatedTimings)
                  setQuestionStartTime(Date.now())
                  setCurrentQuestion(index)
                }}
                className={`h-10 rounded font-semibold transition ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== -1
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">{question.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`w-full p-4 rounded-lg border-2 transition text-left font-medium ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                }`}
              >
                <span className="inline-block w-8 h-8 rounded-full border-2 mr-3 text-center leading-6">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-slate-700 hover:bg-slate-600 text-white disabled:opacity-50"
          >
            Previous Question
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
