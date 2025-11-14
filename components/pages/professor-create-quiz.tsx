'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

interface Topic {
  id: string
  topic: string
  easy: number
  medium: number
  hard: number
}

interface ProfessorCreateQuizProps {
  onBack: () => void
}

export default function ProfessorCreateQuiz({ onBack }: ProfessorCreateQuizProps) {
  const [quizTitle, setQuizTitle] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [topics, setTopics] = useState<Topic[]>([])
  const [timeLimit, setTimeLimit] = useState(30)

  const courses = [
    'Physics 101',
    'Chemistry 201',
    'Biology 150',
    'Math 101',
    'Computer Science 101',
  ]

  const availableTopics = [
    'Mechanics',
    'Thermodynamics',
    'Electromagnetism',
    'Optics',
    'Atomic Physics',
    'Organic Chemistry',
    'Inorganic Chemistry',
    'Physical Chemistry',
  ]

  const handleAddTopic = () => {
    const newTopic: Topic = {
      id: Date.now().toString(),
      topic: '',
      easy: 0,
      medium: 0,
      hard: 0,
    }
    setTopics([...topics, newTopic])
  }

  const handleRemoveTopic = (id: string) => {
    setTopics(topics.filter((t) => t.id !== id))
  }

  const handleTopicChange = (id: string, field: keyof Topic, value: string | number) => {
    setTopics(
      topics.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      )
    )
  }

  const handleCreateQuiz = () => {
    if (!quizTitle || !selectedCourse || topics.length === 0) {
      alert('Please fill in all required fields')
      return
    }
    alert(`Quiz "${quizTitle}" created successfully!`)
    onBack()
  }

  const totalQuestions = topics.reduce((sum, t) => sum + t.easy + t.medium + t.hard, 0)

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create New Quiz</h2>
          <p className="text-slate-400">Define your quiz structure with topics and difficulty levels</p>
        </div>

        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Quiz Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quiz Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Quiz Title
              </label>
              <Input
                type="text"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>

            {/* Time Limit Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Time Limit (minutes)
              </label>
              <Input
                type="number"
                min="5"
                max="180"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value) || 30)}
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-400 mt-2">Students will have {timeLimit} minutes to complete this quiz</p>
            </div>
          </CardContent>
        </Card>

        {/* Topics Section */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-white">Topics & Questions</CardTitle>
            <Button
              onClick={handleAddTopic}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              + Add Topic
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {topics.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No topics added yet. Click "Add Topic" to begin.</p>
            ) : (
              <>
                {topics.map((topic) => (
                  <div key={topic.id} className="p-4 bg-slate-700/50 rounded-lg space-y-4 border border-slate-600">
                    <div className="flex items-end gap-4">
                      {/* Topic Selection */}
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Topic
                        </label>
                        <select
                          value={topic.topic}
                          onChange={(e) =>
                            handleTopicChange(topic.id, 'topic', e.target.value)
                          }
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                          <option value="">Select topic</option>
                          {availableTopics.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Easy Questions */}
                      <div className="w-24">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Easy
                        </label>
                        <Input
                          type="number"
                          min="0"
                          value={topic.easy}
                          onChange={(e) =>
                            handleTopicChange(topic.id, 'easy', parseInt(e.target.value) || 0)
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      {/* Medium Questions */}
                      <div className="w-24">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Medium
                        </label>
                        <Input
                          type="number"
                          min="0"
                          value={topic.medium}
                          onChange={(e) =>
                            handleTopicChange(topic.id, 'medium', parseInt(e.target.value) || 0)
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      {/* Hard Questions */}
                      <div className="w-24">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Hard
                        </label>
                        <Input
                          type="number"
                          min="0"
                          value={topic.hard}
                          onChange={(e) =>
                            handleTopicChange(topic.id, 'hard', parseInt(e.target.value) || 0)
                          }
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>

                      {/* Remove Button */}
                      <Button
                        onClick={() => handleRemoveTopic(topic.id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:bg-red-500/20 h-10 w-10"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total Questions Display */}
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-slate-300">
                    Total Questions: <span className="font-bold text-blue-400">{totalQuestions}</span>
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateQuiz}
            disabled={!quizTitle || !selectedCourse || topics.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            Create Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
