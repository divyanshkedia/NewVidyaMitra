'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import StudentDashboard from '@/components/student-dashboard'
import ProfessorDashboard from '@/components/professor-dashboard'
import AppLayout from '@/components/app-layout'
import LandingPage from '@/components/landing-page'

type AuthState = 'login' | 'signup' | 'role-select'
type UserRole = 'student' | 'professor' | null

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showLanding, setShowLanding] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setAuthState('role-select')
      setEmail('')
      setPassword('')
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && password) {
      setAuthState('role-select')
      setName('')
      setEmail('')
      setPassword('')
    }
  }

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role)
    setIsAuthenticated(true)
    setAuthState('login')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setAuthState('login')
    setEmail('')
    setPassword('')
    setName('')
    setShowLanding(true)
  }

  if (showLanding && !isAuthenticated) {
    return (
      <LandingPage
        onGetStarted={() => {
          setShowLanding(false)
          setAuthState('signup')
        }}
      />
    )
  }

  if (authState === 'role-select') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white">Select Your Role</CardTitle>
            <CardDescription className="text-slate-400">
              Choose how you'll use Vidyamitra
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleRoleSelect('student')}
              className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold"
            >
              Student
            </Button>
            <Button
              onClick={() => handleRoleSelect('professor')}
              className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold"
            >
              Professor
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-800 border-slate-700">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-white">Vidyamitra</CardTitle>
            <CardDescription className="text-slate-400">
              Analytics-driven learning management system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={authState} onValueChange={(val) => setAuthState(val as 'login' | 'signup')}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Full Name</label>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Email</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">Password</label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <AppLayout userRole={userRole} onLogout={handleLogout}>
      {userRole === 'student' ? <StudentDashboard /> : <ProfessorDashboard />}
    </AppLayout>
  )
}
