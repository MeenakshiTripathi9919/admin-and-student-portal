import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthCheck } from "@/components/auth-check"
import { StudentLayout } from "@/components/student-layout"
import { getUserAttempts } from "@/lib/quiz-attempts"
import { getUser } from "@/lib/auth"
import { Eye } from "lucide-react"

export default async function CompletedQuizzesPage() {
  const user = await getUser()
  const attempts = user ? await getUserAttempts(user.id) : []

  // Mock completed quizzes data
  const completedQuizzes = [
    {
      id: "1",
      title: "Geography Basics",
      subject: "Geography",
      completedAt: "2023-05-10T14:45:00",
      score: 80,
      totalQuestions: 5,
    },
    {
      id: "2",
      title: "Science Fundamentals",
      subject: "Science",
      completedAt: "2023-05-15T10:20:00",
      score: 75,
      totalQuestions: 8,
    },
  ]

  // Merge real attempts with mock data for demo purposes
  const displayQuizzes =
    attempts.length > 0
      ? attempts.map((attempt) => ({
          id: attempt.id,
          title: `Quiz Attempt ${attempt.id}`,
          subject: "Mixed",
          completedAt: attempt.completedAt || attempt.startedAt,
          score: attempt.score,
          totalQuestions: attempt.totalQuestions,
        }))
      : completedQuizzes

  return (
    <AuthCheck requiredRole="student">
      <StudentLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Completed Quizzes</h1>

          {displayQuizzes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{quiz.subject}</Badge>
                      <Badge
                        variant={
                          (quiz.score / quiz.totalQuestions) * 100 >= 80
                            ? "success"
                            : (quiz.score / quiz.totalQuestions) * 100 >= 60
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {Math.round((quiz.score / quiz.totalQuestions) * 100)}%
                      </Badge>
                    </div>
                    <CardTitle className="mt-2">{quiz.title}</CardTitle>
                    <CardDescription>Completed on {new Date(quiz.completedAt).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="text-muted-foreground">
                        Score: {quiz.score}/{quiz.totalQuestions}
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/student/completed/${quiz.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Results
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">You haven't completed any quizzes yet.</p>
                <Button asChild>
                  <Link href="/student/quizzes">Take a Quiz</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </StudentLayout>
    </AuthCheck>
  )
}
