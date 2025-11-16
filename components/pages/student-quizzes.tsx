'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'

interface Quiz {
  id: string
  title: string
  course: string
  questions: number
  status: 'available' | 'completed'
  score?: number
  maxScore?: number
  timeLimit?: number
  availableUntil?: string
}

interface StudentQuizzesProps {
  onSelectQuiz: (quizId: string) => void
}

export default function StudentQuizzes({ onSelectQuiz }: StudentQuizzesProps) {
  const [loading, setLoading] = useState(true)
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  
  const supabase = createClient()

  useEffect(() => {
    fetchQuizzes()
  }, [])

  const fetchQuizzes = async () => {
    try {
      setLoading(true)

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('student_id')
        .eq('id', user.id)
        .single()

      if (!profile?.student_id) return

      // Get student's enrolled courses
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('student_id', profile.student_id)

      if (!enrollments || enrollments.length === 0) {
        setLoading(false)
        return
      }

      const courseIds = enrollments.map(e => e.course_id)

      // Get quiz assignments for enrolled courses
      const { data: quizAssignments } = await supabase
        .from('quiz_assignments')
        .select(`
          id,
          quiz_id,
          available_until,
          time_limit_minutes,
          quizzes (
            id,
            title,
            course_id,
            courses (
              name
            )
          )
        `)
        .in('course_id', courseIds)
        .gte('available_until', new Date().toISOString())

      if (!quizAssignments) {
        setLoading(false)
        return
      }

      // Get quiz attempts/results for this student
      const quizIds = quizAssignments.map(qa => qa.quiz_id)
      
      const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('quiz_id, score, max_score')
        .eq('student_uid', profile.student_id)
        .in('quiz_id', quizIds)

      // Get question counts for each quiz
      const { data: quizQuestions } = await supabase
        .from('quiz_questions')
        .select('quiz_id, question_id')
        .in('quiz_id', quizIds)

      // Process quizzes
      const processedQuizzes: Quiz[] = quizAssignments.map(assignment => {
        const quiz = assignment.quizzes as any
        const course = quiz?.courses as any
        const result = quizResults?.find(r => r.quiz_id === assignment.quiz_id)
        const questionCount = quizQuestions?.filter(q => q.quiz_id === assignment.quiz_id).length || 0

        return {
          id: quiz.id,
          title: quiz.title || 'Untitled Quiz',
          course: course?.name || 'Unknown Course',
          questions: questionCount,
          status: result ? 'completed' : 'available',
          score: result ? Number(result.score) : undefined,
          maxScore: result ? Number(result.max_score) : undefined,
          timeLimit: assignment.time_limit_minutes,
          availableUntil: assignment.available_until
        }
      })

      setQuizzes(processedQuizzes)

    } catch (error) {
      console.error('Error fetching quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-slate-400 text-lg">Loading quizzes...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Quizzes</h2>
        <p className="text-slate-400">Attempt and complete your assigned quizzes</p>
      </div>

      {quizzes.length === 0 ? (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-6 text-center text-slate-400">
            No quizzes available at the moment
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white">{quiz.title}</CardTitle>
                    <CardDescription className="text-slate-400">{quiz.course}</CardDescription>
                    {quiz.timeLimit && (
                      <p className="text-xs text-slate-500 mt-1">Time Limit: {quiz.timeLimit} minutes</p>
                    )}
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
                  {quiz.status === 'completed' && quiz.score !== undefined && quiz.maxScore !== undefined && (
                    <div>
                      <p className="text-sm text-slate-400">Your Score</p>
                      <p className="text-lg font-semibold text-emerald-400">
                        {Math.round((quiz.score / quiz.maxScore) * 100)}%
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
      )}
    </div>
  )
}