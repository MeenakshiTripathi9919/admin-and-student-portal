import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthCheck } from "@/components/auth-check"
import { AdminLayout } from "@/components/admin-layout"

export default function ReportsPage() {
  return (
    <AuthCheck requiredRole="admin">
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Reports</h1>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-flex">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="difficulty">Difficulty</TabsTrigger>
              <TabsTrigger value="completion">Completion</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Overview of student performance across all quizzes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Performance chart would appear here</p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Average Scores</CardTitle>
                    <CardDescription>Average scores by student</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">Average scores chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Score Distribution</CardTitle>
                    <CardDescription>Distribution of scores across all quizzes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                      <p className="text-muted-foreground">Score distribution chart would appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Performance breakdown by subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Subject performance chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="difficulty" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Difficulty Analysis</CardTitle>
                  <CardDescription>Performance breakdown by question difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Difficulty analysis chart would appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Completion</CardTitle>
                  <CardDescription>Quiz completion rates and times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">Completion rate chart would appear here</p>
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
