"use server"

// Mock database for questions
let questions = [
  {
    id: "1",
    title: "What is the capital of France?",
    subject: "Geography",
    difficulty: "Easy",
    options: [
      { id: "a", text: "London" },
      { id: "b", text: "Paris" },
      { id: "c", text: "Berlin" },
      { id: "d", text: "Madrid" },
    ],
    correctOption: "b",
    createdAt: new Date("2023-01-15").toISOString(),
  },
  {
    id: "2",
    title: "Which planet is known as the Red Planet?",
    subject: "Science",
    difficulty: "Easy",
    options: [
      { id: "a", text: "Venus" },
      { id: "b", text: "Mars" },
      { id: "c", text: "Jupiter" },
      { id: "d", text: "Saturn" },
    ],
    correctOption: "b",
    createdAt: new Date("2023-02-10").toISOString(),
  },
  {
    id: "3",
    title: "What is the chemical symbol for gold?",
    subject: "Chemistry",
    difficulty: "Medium",
    options: [
      { id: "a", text: "Go" },
      { id: "b", text: "Gd" },
      { id: "c", text: "Au" },
      { id: "d", text: "Ag" },
    ],
    correctOption: "c",
    createdAt: new Date("2023-03-05").toISOString(),
  },
  {
    id: "4",
    title: "Which of the following is a prime number?",
    subject: "Mathematics",
    difficulty: "Medium",
    options: [
      { id: "a", text: "15" },
      { id: "b", text: "21" },
      { id: "c", text: "57" },
      { id: "d", text: "23" },
    ],
    correctOption: "d",
    createdAt: new Date("2023-04-20").toISOString(),
  },
]

export async function getQuestions() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...questions]
}

export async function getQuestion(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))
  return questions.find((q) => q.id === id) || null
}

export async function createQuestion(questionData: {
  title: string
  subject: string
  difficulty: string
  options: { id: string; text: string }[]
  correctOption: string
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newQuestion = {
    id: `q-${Date.now()}`,
    ...questionData,
    createdAt: new Date().toISOString(),
  }

  questions.push(newQuestion)
  return newQuestion
}

export async function updateQuestion(
  id: string,
  questionData: {
    title?: string
    subject?: string
    difficulty?: string
    options?: { id: string; text: string }[]
    correctOption?: string
  },
) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const questionIndex = questions.findIndex((q) => q.id === id)

  if (questionIndex === -1) {
    throw new Error("Question not found")
  }

  questions[questionIndex] = {
    ...questions[questionIndex],
    ...questionData,
  }

  return questions[questionIndex]
}

export async function deleteQuestion(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const initialLength = questions.length
  questions = questions.filter((q) => q.id !== id)

  return initialLength !== questions.length
}
