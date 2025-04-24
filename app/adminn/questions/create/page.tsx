"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AuthCheck } from "@/components/auth-check"
import { AdminLayout } from "@/components/admin-layout"
import { createQuestion } from "@/lib/questions"
import { Plus, Trash2 } from "lucide-react"

export default function CreateQuestionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    difficulty: "",
    options: [
      { id: "a", text: "" },
      { id: "b", text: "" },
      { id: "c", text: "" },
      { id: "d", text: "" },
    ],
    correctOption: "",
  })

  const handleOptionChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) => (option.id === id ? { ...option, text: value } : option)),
    }))
  }

  const addOption = () => {
    // Generate next option ID (e, f, g, etc.)
    const nextId = String.fromCharCode(97 + formData.options.length)

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: nextId, text: "" }],
    }))
  }

  const removeOption = (id: string) => {
    if (formData.options.length <= 2) {
      return // Minimum 2 options
    }

    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== id),
      correctOption: prev.correctOption === id ? "" : prev.correctOption,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await createQuestion(formData)
      router.push("/admin/questions")
    } catch (error) {
      console.error("Failed to create question:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCheck requiredRole="admin">
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create Question</h1>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>New Question</CardTitle>
                <CardDescription>Add a new question to your question bank</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Question</Label>
                  <Textarea
                    id="title"
                    placeholder="Enter your question here"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      required
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Science">Science</SelectItem>
                        <SelectItem value="Geography">Geography</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select
                      value={formData.difficulty}
                      onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                      required
                    >
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Answer Options</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      disabled={formData.options.length >= 6}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Option
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formData.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          {option.id.toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder={`Option ${option.id.toUpperCase()}`}
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                            required
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(option.id)}
                          disabled={formData.options.length <= 2}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove option</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correctOption">Correct Answer</Label>
                  <Select
                    value={formData.correctOption}
                    onValueChange={(value) => setFormData({ ...formData, correctOption: value })}
                    required
                  >
                    <SelectTrigger id="correctOption">
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.options.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          Option {option.id.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.push("/admin/questions")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Question"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </AdminLayout>
    </AuthCheck>
  )
}
