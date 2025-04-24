import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthCheck } from "@/components/auth-check"
import { StudentLayout } from "@/components/student-layout"
import { getUserAttempts } from "@/lib/quiz-attempts"
import { getUser } from "@/lib/auth"
import { BarChart } from "lucide-react"

export default async function ProgressPage() {
  const user = await getUser()
  const attempts = user ? await getUserAttempts(user.id) : []

  // Calculate statistics
  const totalAttempts = attempts.length
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0)
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.score, 0)
  const averageScore = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

  // Mock subject performance data
  const subjectPerformance = [
    { subject: "Mathematics", score: 85, total: 100 },
    { subject: "Science", score: 72, total: 100 },
    { subject: "Geography", score: 90, total: 100 },
    { subject: "Chemistry", score: 65, total: 100 },
  ]

  return (
    <AuthCheck requiredRole="student">
      <StudentLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Your Progress</h1>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Quiz Attempts</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAttempts}</div>
                <p className="text-xs text-muted-foreground">Total quizzes taken</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuestions}</div>
                <p className="text-xs text-muted-foreground">Total questions attempted</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageScore}%</div>
                <p className="text-xs text-muted-foreground">Across all quizzes</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Your overall performance across all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Overall Score</div>
                        <div className="text-sm text-muted-foreground">{averageScore}%</div>
                      </div>
                      <Progress value={averageScore} />
                    </div>

                    <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">Performance trend chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Your performance broken down by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {subjectPerformance.map((subject) => (
                      <div key={subject.subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{subject.subject}</div>
                          <div className="text-sm text-muted-foreground">{subject.score}%</div>
                        </div>
                        <Progress value={subject.score} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz History</CardTitle>
                  <CardDescription>Your past quiz attempts and results</CardDescription>
                </CardHeader>
                <CardContent>
                  {attempts.length > 0 ? (
                    <div className="space-y-4">
                      {attempts.map((attempt) => (
                        <div
                          key={attempt.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">Quiz Attempt</p>
                            <p className="text-sm text-muted-foreground">
                              Score: {attempt.score}/{attempt.totalQuestions} (
                              {Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(attempt.completedAt || attempt.startedAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">You haven't taken any quizzes yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StudentLayout>
    </AuthCheck>
  )
}
