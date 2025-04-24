import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz Assessment Platform</h1>
          <div className="space-x-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Welcome to the Quiz Assessment Platform</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A comprehensive platform for creating, taking, and analyzing educational assessments.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle>For Administrators</CardTitle>
                <CardDescription>Create and manage assessments with ease</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Create custom quizzes and assessments</li>
                  <li>Manage question banks by subject and difficulty</li>
                  <li>Monitor student progress and performance</li>
                  <li>Generate detailed reports and analytics</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/login?role=admin">Admin Login</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>For Students</CardTitle>
                <CardDescription>Take assessments and track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Access assigned quizzes and assessments</li>
                  <li>Get immediate feedback on your answers</li>
                  <li>Track your progress over time</li>
                  <li>Review past attempts and improve your knowledge</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/login?role=student">Student Login</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                <p className="text-muted-foreground">Intuitive interface for both administrators and students</p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">Comprehensive Analytics</h3>
                <p className="text-muted-foreground">Detailed insights into student performance and progress</p>
              </div>
              <div className="p-6 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">Flexible Assessment</h3>
                <p className="text-muted-foreground">Multiple question types and customization options</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            © {new Date().getFullYear()} Quiz Assessment Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
