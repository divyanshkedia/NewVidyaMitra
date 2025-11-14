'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const coursesData = [
  {
    id: 1,
    name: 'Web Development Fundamentals',
    instructor: 'Dr. Sarah Chen',
    credits: 3,
    semester: 'Fall 2024',
    pace: 'Fast Learner',
    progress: 85,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Data Structures & Algorithms',
    instructor: 'Prof. Michael Kumar',
    credits: 4,
    semester: 'Fall 2024',
    pace: 'Moderate Learner',
    progress: 62,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Database Design',
    instructor: 'Prof. Emma Watson',
    credits: 3,
    semester: 'Fall 2024',
    pace: 'Slow Learner',
    progress: 45,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Cloud Computing',
    instructor: 'Dr. James Lee',
    credits: 3,
    semester: 'Spring 2025',
    pace: 'Not Started',
    progress: 0,
    status: 'Upcoming'
  },
]

export default function StudentCourses() {
  const activeCourses = coursesData.filter(c => c.status === 'Active')
  const upcomingCourses = coursesData.filter(c => c.status === 'Upcoming')

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Courses</h1>
        <p className="text-slate-400">View all enrolled and upcoming courses</p>
      </div>

      {/* Active Courses */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Active Courses ({activeCourses.length})</h2>
        <div className="grid grid-cols-1 gap-4">
          {activeCourses.map((course) => (
            <Card key={course.id} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white text-lg">{course.name}</h3>
                    <p className="text-sm text-slate-400">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-500 text-blue-300 mb-2">{course.pace}</Badge>
                    <p className="text-sm text-slate-400">{course.credits} credits</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Progress</span>
                    <span className="text-white font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Upcoming Courses */}
      {upcomingCourses.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white">Upcoming Courses ({upcomingCourses.length})</h2>
          <div className="grid grid-cols-1 gap-4">
            {upcomingCourses.map((course) => (
              <Card key={course.id} className="bg-slate-800/50 border-slate-700 opacity-75">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-white text-lg">{course.name}</h3>
                      <p className="text-sm text-slate-400">{course.instructor}</p>
                      <p className="text-xs text-slate-500 mt-1">Starts in {course.semester}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{course.credits} credits</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
