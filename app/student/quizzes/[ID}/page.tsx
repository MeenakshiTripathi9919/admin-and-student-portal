"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AuthCheck } from "@/components/auth-check"
import { StudentLayout } from "@/components/student-layout"
import { getQuestions } from "@/lib/questions"
import { getUser } from "@/lib/auth"
import { createAttempt, submitAttempt } from "@/lib/quiz-attempts"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizResult, setQuizResult] = useState<any>(null)

  useEffect(() => {
    async function loadQuiz() {
      try {
        const userData = await getUser()
        setUser(userData)

        const allQuestions = await getQuestions()

        // For demo purposes, we'll use a subset of questions based on the quiz ID
        // In a real app, you'd fetch the specific questions for this quiz
        const quizQuestions = allQuestions.slice(0, Number.parseInt(params.id) + 2)
        setQuestions(quizQuestions)

        // Create a new attempt
        if (userData) {
          const attempt = await createAttempt({
            userId: userData.id,
            questions: quizQuestions.map((q) => q.id),
          })
          setAttemptId(attempt.id)
        }

        setLoading(false)
      } catch (error) {
        console.error("Failed to load quiz:", error)
        setLoading(false)
      }
    }

    loadQuiz()
  }, [params.id])

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!attemptId) return

    try {
      const result = await submitAttempt(attemptId, selectedAnswers, questions)
      setQuizCompleted(true)
      setQuizResult(result)
    } catch (error) {
      console.error("Failed to submit quiz:", error)
    }
  }

  if (loading) {
    return (
      <AuthCheck requiredRole="student">
        <StudentLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </StudentLayout>
      </AuthCheck>
    )
  }

  if (quizCompleted && quizResult) {
    const score = quizResult.score
    const totalQuestions = quizResult.totalQuestions
    const percentage = Math.round((score / totalQuestions) * 100)

    return (
      <AuthCheck requiredRole="student">
        <StudentLayout>
          <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-12">
            <Card className="w-full">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>You've completed the quiz. Here's your result.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{percentage}%</div>
                  <p className="text-muted-foreground">
                    You scored {score} out of {totalQuestions} questions
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div>Score</div>
                    <div className="font-medium">
                      {score}/{totalQuestions}
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => router.push("/student/quizzes")}>
                  Back to Quizzes
                </Button>
                <Button onClick={() => router.push("/student/progress")}>View Progress</Button>
              </CardFooter>
            </Card>
          </div>
        </StudentLayout>
      </AuthCheck>
    )
  }

  if (!currentQuestion) {
    return (
      <AuthCheck requiredRole="student">
        <StudentLayout>
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <p className="text-muted-foreground mb-4">No questions found for this quiz.</p>
            <Button onClick={() => router.push("/student/quizzes")}>Back to Quizzes</Button>
          </div>
        </StudentLayout>
      </AuthCheck>
    )
  }

  return (
    <AuthCheck requiredRole="student">
      <StudentLayout>
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Quiz in Progress</h1>
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            </div>
            <Progress value={(currentQuestionIndex / (questions.length - 1)) * 100} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAnswers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option: any) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                  >
                    <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                    <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                      {option.text}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentQuestionIndex === questions.length - 1 ? (
                <Button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestion.id]}>
                  Submit Quiz
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestion.id]}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </StudentLayout>
    </AuthCheck>
  )
}
