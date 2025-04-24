"use server"

import { cookies } from "next/headers"

// Mock user database
const users = [
  { id: "1", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
  { id: "2", name: "Student User", email: "student@example.com", password: "student123", role: "student" },
]

// For demo purposes, we'll store new users here
const newUsers: any[] = []

export async function login(email: string, password: string, role: "admin" | "student") {
  // Simulate a delay for API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user exists in mock database or newly registered users
  const user = [...users, ...newUsers].find((u) => u.email === email && u.password === password && u.role === role)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  // Set a cookie to simulate authentication
  cookies().set(
    "user",
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    },
  )

  return { success: true }
}

export async function register(name: string, email: string, password: string, role: "admin" | "student") {
  // Simulate a delay for API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if ([...users, ...newUsers].some((u) => u.email === email)) {
    throw new Error("User already exists")
  }

  // Create new user
  const newUser = {
    id: `new-${Date.now()}`,
    name,
    email,
    password,
    role,
  }

  // Add to our "database"
  newUsers.push(newUser)

  // Set a cookie to simulate authentication
  cookies().set(
    "user",
    JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    },
  )

  return { success: true }
}

export async function logout() {
  cookies().delete("user")
  return { success: true }
}

export async function getUser() {
  const userCookie = cookies().get("user")

  if (!userCookie) {
    return null
  }

  try {
    return JSON.parse(userCookie.value)
  } catch (error) {
    return null
  }
}
