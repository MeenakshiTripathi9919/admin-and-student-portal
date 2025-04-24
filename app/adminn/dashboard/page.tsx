import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthCheck } from "@/components/auth-check"
import { AdminLayout } from "@/components/admin-layout"
import { getQuestions } from "@/lib/questions"
import { BarChart, BookOpen, Users } from "lucide-react"

export default async function AdminDashboardPage() {
  const questions = await getQuestions()

  // Mock statistics
  const stats = {
    totalStudents: 42,
    totalQuizzes: 8,
    totalQuestions: questions.length,
    averageScore: 78,
    completionRate: 92,
    recentActivity: [
      { id: 1, user: "John Doe", action: "Completed Quiz: Geography Basics", time: "2 hours ago" },
      { id: 2, user: "Jane Smith", action: "Started Quiz: Chemistry 101", time: "3 hours ago" },
      { id: 3, user: "Mike Johnson", action: "Completed Quiz: Math Fundamentals", time: "5 hours ago" },
      { id: 4, user: "Sarah Williams", action: "Started Quiz: Science Quiz", time: "6 hours ago" },
      { id: 5, user: "David Brown", action: "Completed Quiz: History Test", time: "8 hours ago" },
    ],
  }

  return (
    <AuthCheck requiredRole="admin">
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
                <p className="text-xs text-muted-foreground">+2 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalQuestions}</div>
                <p className="text-xs text-muted-foreground">
                  +{questions.length > 4 ? questions.length - 4 : 0} from last week
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Key metrics about student performance and engagement</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-2 text-sm font-medium">Average Score</div>
                    <div className="text-3xl font-bold">{stats.averageScore}%</div>
                    <div className="mt-1 text-xs text-muted-foreground">+2% from last month</div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium">Completion Rate</div>
                    <div className="text-3xl font-bold">{stats.completionRate}%</div>
                    <div className="mt-1 text-xs text-muted-foreground">+5% from last month</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Question Distribution</CardTitle>
                  <CardDescription>Questions by subject and difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">By Subject</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {["Mathematics", "Science", "Geography", "Chemistry"].map((subject) => (
                          <div key={subject} className="flex items-center justify-between">
                            <span className="text-sm">{subject}</span>
                            <span className="text-sm font-medium">
                              {questions.filter((q) => q.subject === subject).length ||
                                Math.floor(Math.random() * 5) + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium">By Difficulty</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {["Easy", "Medium", "Hard"].map((difficulty) => (
                          <div key={difficulty} className="flex items-center justify-between">
                            <span className="text-sm">{difficulty}</span>
                            <span className="text-sm font-medium">
                              {questions.filter((q) => q.difficulty === difficulty).length ||
                                Math.floor(Math.random() * 5) + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Analytics on student quiz performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Performance chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions by students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="font-medium">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">{activity.action}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminLayout>
    </AuthCheck>
  )
}
