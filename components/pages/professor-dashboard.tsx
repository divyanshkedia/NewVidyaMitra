'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const classPerformanceData = [
  { category: 'Fast Learners', students: 35, avgScore: 88 },
  { category: 'Moderate Learners', students: 50, avgScore: 75 },
  { category: 'Slow Learners', students: 15, avgScore: 62 },
]

const studentDistribution = [
  { week: 'Week 1', fastLearners: 20, moderate: 45, slowLearners: 10 },
  { week: 'Week 2', fastLearners: 28, moderate: 50, slowLearners: 12 },
  { week: 'Week 3', fastLearners: 32, moderate: 48, slowLearners: 15 },
  { week: 'Week 4', fastLearners: 35, moderate: 50, slowLearners: 15 },
  { week: 'Week 5', fastLearners: 35, moderate: 50, slowLearners: 15 },
]

export default function ProfessorDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Overview</h1>
        <p className="text-slate-400">View aggregated analytics across all your classes</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">257</p>
            <p className="text-xs text-slate-400 mt-1">Across 3 courses</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">76.3%</p>
            <p className="text-xs text-slate-400 mt-1">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Fast Learners</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">85</p>
            <p className="text-xs text-slate-400 mt-1">33% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Need Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">42</p>
            <p className="text-xs text-slate-400 mt-1">Slow learners requiring assistance</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance by Learning Pace */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Class Performance by Learning Pace</CardTitle>
          <CardDescription className="text-slate-400">Average scores and student distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9ca3af" />
              <YAxis yAxisId="left" stroke="#9ca3af" />
              <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="avgScore" fill="#3b82f6" name="Avg Score (%)" />
              <Bar yAxisId="right" dataKey="students" fill="#10b981" name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Learner Distribution Over Time */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Student Distribution Trend</CardTitle>
          <CardDescription className="text-slate-400">How student categories evolve each week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studentDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="fastLearners" stroke="#3b82f6" strokeWidth={2} name="Fast Learners" />
              <Line type="monotone" dataKey="moderate" stroke="#10b981" strokeWidth={2} name="Moderate" />
              <Line type="monotone" dataKey="slowLearners" stroke="#f59e0b" strokeWidth={2} name="Slow Learners" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
