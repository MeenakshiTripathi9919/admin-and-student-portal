import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthCheck } from "@/components/auth-check"
import { StudentLayout } from "@/components/student-layout"
import { getQuestions } from "@/lib/questions"
import { BookOpen, Clock } from "lucide-react"

export default async function QuizzesPage() {
  const questions = await getQuestions()

  // Group questions into quizzes (for demo purposes)
  const quizzes = [
    {
      id: "1",
      title: "Geography Basics",
      description: "Test your knowledge of world geography",
      subject: "Geography",
      questions: 5,
      estimatedTime: "10 min",
      difficulty: "Easy",
    },
    {
      id: "2",
      title: "Science Fundamentals",
      description: "Basic concepts in science",
      subject: "Science",
      questions: 8,
      estimatedTime: "15 min",
      difficulty: "Medium",
    },
    {
      id: "3",
      title: "Math Quiz",
      description: "Test your mathematical skills",
      subject: "Mathematics",
      questions: 10,
      estimatedTime: "20 min",
      difficulty: "Hard",
    },
    {
      id: "4",
      title: "Chemistry Basics",
      description: "Fundamental chemistry concepts",
      subject: "Chemistry",
      questions: 6,
      estimatedTime: "12 min",
      difficulty: "Medium",
    },
  ]

  return (
    <AuthCheck requiredRole="student">
      <StudentLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Available Quizzes</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        quiz.difficulty === "Easy"
                          ? "outline"
                          : quiz.difficulty === "Medium"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {quiz.difficulty}
                    </Badge>
                    <Badge variant="outline">{quiz.subject}</Badge>
                  </div>
                  <CardTitle className="mt-2">{quiz.title}</CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {quiz.questions} questions
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {quiz.estimatedTime}
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/student/quizzes/${quiz.id}`}>Start Quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </StudentLayout>
    </AuthCheck>
  )
}
