import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AuthCheck } from "@/components/auth-check"
import { StudentLayout } from "@/components/student-layout"
import { getQuestions } from "@/lib/questions"
import { getUserAttempts } from "@/lib/quiz-attempts"
import { getUser } from "@/lib/auth"
import { BookOpen, CheckCircle, Clock, BarChart } from "lucide-react"

export default async function StudentDashboardPage() {
  const user = await getUser()
  const questions = await getQuestions()
  const attempts = user ? await getUserAttempts(user.id) : []

  // Calculate statistics
  const totalQuizzes = Math.floor(questions.length / 2) // Assuming 2 questions per quiz
  const completedQuizzes = attempts.length
  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, attempt) => sum + (attempt.score / attempt.totalQuestions) * 100, 0) / attempts.length,
        )
      : 0

  // Mock recommended quizzes
  const recommendedQuizzes = [
    { id: "1", title: "Geography Basics", questions: 5, estimatedTime: "10 min" },
    { id: "2", title: "Science Fundamentals", questions: 8, estimatedTime: "15 min" },
    { id: "3", title: "Math Quiz", questions: 10, estimatedTime: "20 min" },
  ]

  return (
    <AuthCheck requiredRole="student">
      <StudentLayout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || "Student"}! Here's your learning progress.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuizzes}</div>
                <p className="text-xs text-muted-foreground">Available to take</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedQuizzes}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((completedQuizzes / totalQuizzes) * 100)}% completion rate
                </p>
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

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Overall Completion</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((completedQuizzes / totalQuizzes) * 100)}%
                    </div>
                  </div>
                  <Progress value={Math.round((completedQuizzes / totalQuizzes) * 100)} />
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium">Subject Progress</div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Mathematics</div>
                      <div className="text-sm text-muted-foreground">75%</div>
                    </div>
                    <Progress value={75} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Science</div>
                      <div className="text-sm text-muted-foreground">60%</div>
                    </div>
                    <Progress value={60} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Geography</div>
                      <div className="text-sm text-muted-foreground">40%</div>
                    </div>
                    <Progress value={40} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Quizzes</CardTitle>
                <CardDescription>Based on your performance and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{quiz.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {quiz.questions} questions
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            {quiz.estimatedTime}
                          </div>
                        </div>
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/student/quizzes/${quiz.id}`}>Start</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/student/quizzes">View All Quizzes</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent quiz attempts and results</CardDescription>
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
                  <p className="text-muted-foreground mb-4">You haven't taken any quizzes yet.</p>
                  <Button asChild>
                    <Link href="/student/quizzes">Start a Quiz</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </StudentLayout>
    </AuthCheck>
  )
}
