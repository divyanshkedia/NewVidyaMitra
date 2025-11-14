'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const coursesPerformance = [
  {
    id: 1,
    name: 'Web Development',
    learningPace: 'Fast Learner',
    currentScore: 92,
    classAvg: 82,
    trend: [
      { week: 'Week 1', score: 82 },
      { week: 'Week 2', score: 85 },
      { week: 'Week 3', score: 89 },
      { week: 'Week 4', score: 92 },
    ],
  },
  {
    id: 2,
    name: 'Data Structures',
    learningPace: 'Moderate Learner',
    currentScore: 74,
    classAvg: 76,
    trend: [
      { week: 'Week 1', score: 68 },
      { week: 'Week 2', score: 70 },
      { week: 'Week 3', score: 72 },
      { week: 'Week 4', score: 74 },
    ],
  },
  {
    id: 3,
    name: 'Database Systems',
    learningPace: 'Slow Learner',
    currentScore: 58,
    classAvg: 71,
    trend: [
      { week: 'Week 1', score: 45 },
      { week: 'Week 2', score: 50 },
      { week: 'Week 3', score: 54 },
      { week: 'Week 4', score: 58 },
    ],
  },
]

const overallComparison = [
  { category: 'Quizzes', myAvg: 82, classAvg: 78 },
  { category: 'Assignments', myAvg: 88, classAvg: 80 },
  { category: 'Midterm', myAvg: 79, classAvg: 75 },
  { category: 'Participation', myAvg: 92, classAvg: 85 },
]

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

export default function StudentPerformance() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Performance Analytics</h1>
        <p className="text-slate-400">Track your academic progress across all courses</p>
      </div>

      <div className="space-y-6">
        {coursesPerformance.map((course) => (
          <Card key={course.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white">{course.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                      course.learningPace === 'Fast Learner' ? 'bg-blue-500/20 text-blue-300' :
                      course.learningPace === 'Moderate Learner' ? 'bg-green-500/20 text-green-300' :
                      'bg-amber-500/20 text-amber-300'
                    }`}>
                      {course.learningPace}
                    </span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-400">{course.currentScore}%</p>
                  <p className="text-xs text-slate-400">Class Avg: {course.classAvg}%</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={course.trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="Your Score" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Assessment Breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Assessment Performance</CardTitle>
          <CardDescription className="text-slate-400">Your scores vs class average across different assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overallComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar dataKey="myAvg" fill="#8b5cf6" name="Your Average" />
              <Bar dataKey="classAvg" fill="#ec4899" name="Class Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Overall GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">3.45</p>
            <p className="text-xs text-blue-400 mt-1">↑ 0.15 from last semester</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Best Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">Web Dev</p>
            <p className="text-xs text-slate-400 mt-1">92% - Fast Learner</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Rank in Class</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">Top 15%</p>
            <p className="text-xs text-slate-400 mt-1">Of 200 students</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
