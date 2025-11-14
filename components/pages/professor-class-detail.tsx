'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface ProfessorClassDetailProps {
  classId: number
  onBack: () => void
}

const classDetails: Record<number, {
  name: string
  students: Array<{
    id: number
    name: string
    pace: string
    score: number
    assignments: string
    status: string
  }>
}> = {
  1: {
    name: 'Web Development Fundamentals',
    students: [
      { id: 1, name: 'Alice Johnson', pace: 'Fast Learner', score: 92, assignments: '15/15', status: 'On Track' },
      { id: 2, name: 'Bob Smith', pace: 'Moderate Learner', score: 78, assignments: '14/15', status: 'Progressing' },
      { id: 3, name: 'Carol Davis', pace: 'Fast Learner', score: 88, assignments: '15/15', status: 'On Track' },
      { id: 4, name: 'David Lee', pace: 'Slow Learner', score: 65, assignments: '12/15', status: 'At Risk' },
      { id: 5, name: 'Emma Wilson', pace: 'Moderate Learner', score: 74, assignments: '13/15', status: 'Progressing' },
    ]
  },
  2: {
    name: 'Data Structures & Algorithms',
    students: [
      { id: 6, name: 'Frank Miller', pace: 'Fast Learner', score: 89, assignments: '15/15', status: 'On Track' },
      { id: 7, name: 'Grace Taylor', pace: 'Moderate Learner', score: 76, assignments: '14/15', status: 'Progressing' },
      { id: 8, name: 'Henry Brown', pace: 'Slow Learner', score: 62, assignments: '11/15', status: 'At Risk' },
      { id: 9, name: 'Iris Garcia', pace: 'Fast Learner', score: 95, assignments: '15/15', status: 'On Track' },
    ]
  },
  3: {
    name: 'Database Design',
    students: [
      { id: 10, name: 'Jack Wilson', pace: 'Moderate Learner', score: 72, assignments: '13/15', status: 'Progressing' },
      { id: 11, name: 'Kate Harris', pace: 'Fast Learner', score: 86, assignments: '15/15', status: 'On Track' },
      { id: 12, name: 'Leo Martin', pace: 'Slow Learner', score: 58, assignments: '10/15', status: 'At Risk' },
    ]
  }
}

export default function ProfessorClassDetail({ classId, onBack }: ProfessorClassDetailProps) {
  const classData = classDetails[classId]

  if (!classData) {
    return <div>Class not found</div>
  }

  const stats = {
    totalStudents: classData.students.length,
    avgScore: Math.round(classData.students.reduce((sum, s) => sum + s.score, 0) / classData.students.length),
    atRisk: classData.students.filter(s => s.status === 'At Risk').length,
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={onBack}
          variant="ghost" 
          size="icon"
          className="text-slate-300 hover:bg-slate-700"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">{classData.name}</h1>
          <p className="text-slate-400">Student tracking and performance details</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{stats.totalStudents}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{stats.avgScore}%</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Students At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-400">{stats.atRisk}</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Student Performance Tracking</CardTitle>
          <CardDescription className="text-slate-400">Individual student details and learning pace classification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Learning Pace</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Assignments</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {classData.students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition">
                    <td className="py-3 px-4 text-white">{student.name}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        student.pace === 'Fast Learner' ? 'bg-blue-500/20 text-blue-300' :
                        student.pace === 'Moderate Learner' ? 'bg-green-500/20 text-green-300' :
                        'bg-amber-500/20 text-amber-300'
                      }`}>
                        {student.pace}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{student.score}%</td>
                    <td className="py-3 px-4 text-slate-400">{student.assignments}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        student.score >= 80 ? 'bg-green-500/20 text-green-300' :
                        student.score >= 70 ? 'bg-blue-500/20 text-blue-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Reports Section */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Class Reports</CardTitle>
          <CardDescription className="text-slate-400">Generate and download reports for this class</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Download Performance Report
          </Button>
          <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700">
            Export Student Data
          </Button>
          <Button variant="outline" className="w-full border-slate-600 text-slate-200 hover:bg-slate-700">
            Generate Progress Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
