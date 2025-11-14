'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const classesData = [
  { id: 1, name: 'Web Development Fundamentals', students: 100, avgScore: 82, fastLearners: 35, moderateLearners: 50, slowLearners: 15 },
  { id: 2, name: 'Data Structures & Algorithms', students: 85, avgScore: 76, fastLearners: 28, moderateLearners: 45, slowLearners: 12 },
  { id: 3, name: 'Database Design', students: 72, avgScore: 71, fastLearners: 22, moderateLearners: 38, slowLearners: 12 },
]

interface ProfessorClassesProps {
  onSelectClass: (classId: number) => void
}

export default function ProfessorClasses({ onSelectClass }: ProfessorClassesProps) {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null)
  const [uploadMessage, setUploadMessage] = useState('')

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, classId: number) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simple CSV parsing example
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        const lines = text.split('\n')
        const studentCount = lines.filter(line => line.trim()).length - 1 // Exclude header
        setUploadMessage(`Successfully added ${studentCount} students to the class!`)
        setTimeout(() => {
          setShowUploadModal(false)
          setUploadMessage('')
        }, 2000)
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Classes</h1>
          <p className="text-slate-400">Click on a class to view student tracking and detailed reports</p>
        </div>
      </div>

      <div className="space-y-4">
        {classesData.map((course) => (
          <div key={course.id} className="space-y-2">
            <Card 
              className="bg-slate-800 border-slate-700 hover:border-blue-500 transition cursor-pointer"
              onClick={() => onSelectClass(course.id)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg mb-2">{course.name}</h3>
                    <p className="text-sm text-slate-400 mb-4">{course.students} students enrolled</p>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <p className="text-xs text-slate-400">Class Average</p>
                        <p className="text-lg font-semibold text-blue-400">{course.avgScore}%</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <p className="text-xs text-slate-400">Fast Learners</p>
                        <p className="text-lg font-semibold text-blue-400">{course.fastLearners}</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <p className="text-xs text-slate-400">Moderate</p>
                        <p className="text-lg font-semibold text-green-400">{course.moderateLearners}</p>
                      </div>
                      <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <p className="text-xs text-slate-400">Need Support</p>
                        <p className="text-lg font-semibold text-amber-400">{course.slowLearners}</p>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 flex-shrink-0 mt-2" size={24} />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => {
                setSelectedClassId(course.id)
                setShowUploadModal(true)
              }}
              variant="outline"
              className="w-full border-slate-600 text-slate-200 hover:bg-slate-700"
            >
              <Upload size={16} className="mr-2" />
              Bulk Add Students (CSV)
            </Button>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-xl font-semibold text-white">Upload Student List</h3>
              <p className="text-sm text-slate-400">
                Upload a CSV file with student UIDs. Format: One UID per line or CSV with columns.
              </p>

              {uploadMessage && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-300 text-sm">
                  {uploadMessage}
                </div>
              )}

              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => handleFileUpload(e, selectedClassId!)}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                  <p className="text-slate-300 font-medium">Click to upload CSV</p>
                  <p className="text-xs text-slate-500 mt-1">or drag and drop</p>
                </label>
              </div>

              <div className="text-sm text-slate-400 bg-slate-700/30 p-3 rounded">
                <p className="font-semibold text-slate-300 mb-2">Sample CSV format:</p>
                <pre className="text-xs">student_uid,name{'\n'}STU001,John Doe{'\n'}STU002,Jane Smith</pre>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowUploadModal(false)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
