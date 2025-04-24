"use server"

// Mock database for quiz attempts
const quizAttempts = [
  {
    id: "1",
    userId: "2", // Student user
    questions: ["1", "2"],
    answers: { "1": "b", "2": "b" },
    score: 2,
    totalQuestions: 2,
    startedAt: new Date("2023-05-10T14:30:00").toISOString(),
    completedAt: new Date("2023-05-10T14:45:00").toISOString(),
  },
  {
    id: "2",
    userId: "2", // Student user
    questions: ["3", "4"],
    answers: { "3": "c", "4": "a" },
    score: 1,
    totalQuestions: 2,
    startedAt: new Date("2023-05-15T10:00:00").toISOString(),
    completedAt: new Date("2023-05-15T10:20:00").toISOString(),
  },
]

export async function getUserAttempts(userId: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return quizAttempts.filter((attempt) => attempt.userId === userId)
}

export async function getAttempt(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return quizAttempts.find((attempt) => attempt.id === id) || null
}

export async function createAttempt(attemptData: {
  userId: string
  questions: string[]
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newAttempt = {
    id: `a-${Date.now()}`,
    ...attemptData,
    answers: {},
    score: 0,
    totalQuestions: attemptData.questions.length,
    startedAt: new Date().toISOString(),
    completedAt: null,
  }

  quizAttempts.push(newAttempt)
  return newAttempt
}

export async function submitAttempt(id: string, answers: Record<string, string>, questions: any[]) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const attemptIndex = quizAttempts.findIndex((a) => a.id === id)

  if (attemptIndex === -1) {
    throw new Error("Attempt not found")
  }

  // Calculate score
  let score = 0
  for (const question of questions) {
    if (answers[question.id] === question.correctOption) {
      score++
    }
  }

  quizAttempts[attemptIndex] = {
    ...quizAttempts[attemptIndex],
    answers,
    score,
    completedAt: new Date().toISOString(),
  }

  return quizAttempts[attemptIndex]
}
