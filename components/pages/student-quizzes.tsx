'use client'
import { createClient } from '@/lib/supabase/client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Quiz {
  id: number
  title: string
  course: string
  questions: number
  status: 'available' | 'completed'
  score?: number
}

interface StudentQuizzesProps {
  onSelectQuiz: (quizId: number) => void
}

export default function StudentQuizzes({ onSelectQuiz }: StudentQuizzesProps) {
  const [quizzes] = useState<Quiz[]>([
    {
      id: 1,
      title: 'Physics Fundamentals',
      course: 'Physics 101',
      questions: 15,
      status: 'available',
    },
    {
      id: 2,
      title: 'Chemistry Basics',
      course: 'Chemistry 201',
      questions: 20,
      status: 'completed',
      score: 18,
    },
    {
      id: 3,
      title: 'Biology Concepts',
      course: 'Biology 150',
      questions: 12,
      status: 'available',
    },
    {
      id: 4,
      title: 'Mathematics Algebra',
      course: 'Math 101',
      questions: 25,
      status: 'completed',
      score: 22,
    },
  ])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Quizzes</h2>
        <p className="text-slate-400">Attempt and complete your assigned quizzes</p>
      </div>

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white">{quiz.title}</CardTitle>
                  <CardDescription className="text-slate-400">{quiz.course}</CardDescription>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    quiz.status === 'available'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {quiz.status === 'available' ? 'Available' : 'Completed'}
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-slate-400">Questions</p>
                  <p className="text-lg font-semibold text-white">{quiz.questions}</p>
                </div>
                {quiz.status === 'completed' && (
                  <div>
                    <p className="text-sm text-slate-400">Your Score</p>
                    <p className="text-lg font-semibold text-emerald-400">
                      {quiz.score}/{quiz.questions}
                    </p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => onSelectQuiz(quiz.id)}
                disabled={quiz.status === 'completed'}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {quiz.status === 'available' ? 'Take Quiz' : 'View Results'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
