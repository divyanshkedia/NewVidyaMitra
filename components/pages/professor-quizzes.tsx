'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, ChevronDown, Clock } from 'lucide-react'

interface Quiz {
  id: number
  title: string
  course: string
  topics: number
  totalQuestions: number
  createdDate: string
  timeLimit: number
  studentResults: Array<{
    studentName: string
    score: number
    totalQuestions: number
    percentage: number
    timeTaken: number
    submittedAt: string
    answers: Array<{
      questionId: number
      question: string
      selected: string
      correct: string
      isCorrect: boolean
      timeSpent: number
    }>
  }>
}

interface ProfessorQuizzesProps {
  onCreateQuiz: () => void
}

export default function ProfessorQuizzes({ onCreateQuiz }: ProfessorQuizzesProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: 'Physics Fundamentals',
      course: 'Physics 101',
      topics: 3,
      totalQuestions: 15,
      createdDate: '2024-11-10',
      timeLimit: 30,
      studentResults: [
        {
          studentName: 'Alice Johnson',
          score: 14,
          totalQuestions: 15,
          percentage: 93,
          timeTaken: 1560,
          submittedAt: '2024-11-15 14:30',
          answers: [
            {
              questionId: 1,
              question: 'What is the SI unit of force?',
              selected: 'Newton',
              correct: 'Newton',
              isCorrect: true,
              timeSpent: 45,
            },
            {
              questionId: 2,
              question: 'At what temperature does water boil?',
              selected: '100°C',
              correct: '100°C',
              isCorrect: true,
              timeSpent: 38,
            },
          ],
        },
        {
          studentName: 'Bob Smith',
          score: 12,
          totalQuestions: 15,
          percentage: 80,
          timeTaken: 1720,
          submittedAt: '2024-11-15 14:45',
          answers: [
            {
              questionId: 1,
              question: 'What is the SI unit of force?',
              selected: 'Kilogram',
              correct: 'Newton',
              isCorrect: false,
              timeSpent: 120,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Chemistry Basics',
      course: 'Chemistry 201',
      topics: 4,
      totalQuestions: 20,
      createdDate: '2024-11-05',
      timeLimit: 25,
      studentResults: [
        {
          studentName: 'Carol Davis',
          score: 18,
          totalQuestions: 20,
          percentage: 90,
          timeTaken: 1340,
          submittedAt: '2024-11-14 10:15',
          answers: [],
        },
      ],
    },
  ])

  const [expandedQuiz, setExpandedQuiz] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setQuizzes(quizzes.filter((q) => q.id !== id))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Management</h2>
          <p className="text-slate-400">Create and manage quizzes for your courses</p>
        </div>
        <Button
          onClick={onCreateQuiz}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create New Quiz
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-12 pb-12 text-center">
            <p className="text-slate-400 mb-4">No quizzes created yet</p>
            <Button
              onClick={onCreateQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Your First Quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white">{quiz.title}</CardTitle>
                      <CardDescription className="text-slate-400">{quiz.course}</CardDescription>
                    </div>
                    <Button
                      onClick={() => handleDelete(quiz.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-sm text-slate-400">Topics</p>
                      <p className="text-lg font-semibold text-white">{quiz.topics}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Total Questions</p>
                      <p className="text-lg font-semibold text-white">{quiz.totalQuestions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Time Limit</p>
                      <p className="text-lg font-semibold text-white flex items-center gap-1">
                        <Clock size={16} /> {quiz.timeLimit}m
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Submissions</p>
                      <p className="text-lg font-semibold text-white">{quiz.studentResults.length}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                    className="bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    <ChevronDown size={18} className={`transition ${expandedQuiz === quiz.id ? 'rotate-180' : ''}`} />
                  </Button>
                </CardContent>
              </Card>

              {expandedQuiz === quiz.id && (
                <Card className="bg-slate-700/30 border-slate-600 mt-2">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Student Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quiz.studentResults.length === 0 ? (
                      <p className="text-slate-400 text-center py-4">No submissions yet</p>
                    ) : (
                      <div className="space-y-4">
                        {quiz.studentResults.map((result, idx) => (
                          <div key={idx} className="bg-slate-800 rounded-lg p-4 border border-slate-600">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-semibold text-white">{result.studentName}</p>
                                <p className="text-sm text-slate-400">{result.submittedAt}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-blue-400">{result.percentage}%</p>
                                <p className="text-sm text-slate-400">{result.score}/{result.totalQuestions}</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                              <div className="bg-slate-700/50 rounded p-3">
                                <p className="text-slate-400">Time Taken</p>
                                <p className="text-white font-semibold flex items-center gap-1">
                                  <Clock size={14} />
                                  {formatTime(result.timeTaken)}
                                </p>
                              </div>
                              <div className="bg-slate-700/50 rounded p-3">
                                <p className="text-slate-400">Avg per Question</p>
                                <p className="text-white font-semibold">
                                  {formatTime(Math.round(result.timeTaken / result.totalQuestions))}
                                </p>
                              </div>
                              <div className="bg-slate-700/50 rounded p-3">
                                <p className="text-slate-400">Accuracy</p>
                                <p className="text-white font-semibold">{result.percentage}%</p>
                              </div>
                            </div>

                            {/* Answer details */}
                            {result.answers.length > 0 && (
                              <div className="border-t border-slate-600 pt-4 mt-4">
                                <p className="text-sm font-semibold text-slate-300 mb-3">Answer Details</p>
                                <div className="space-y-2 text-sm">
                                  {result.answers.map((answer, aIdx) => (
                                    <div key={aIdx} className="flex items-start justify-between p-2 bg-slate-700/30 rounded">
                                      <div className="flex-1">
                                        <p className="text-slate-300">{answer.question}</p>
                                        <div className="flex gap-4 mt-1">
                                          <span className={`text-xs px-2 py-1 rounded ${
                                            answer.isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                                          }`}>
                                            {answer.isCorrect ? '✓ Correct' : '✗ Wrong'}
                                          </span>
                                          <span className="text-slate-400">Selected: {answer.selected}</span>
                                          {!answer.isCorrect && (
                                            <span className="text-emerald-400">Correct: {answer.correct}</span>
                                          )}
                                        </div>
                                      </div>
                                      <span className="text-slate-500 flex items-center gap-1 whitespace-nowrap ml-4">
                                        <Clock size={12} />
                                        {answer.timeSpent}s
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
