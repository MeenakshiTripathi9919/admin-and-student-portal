import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AuthCheck } from "@/components/auth-check"
import { AdminLayout } from "@/components/admin-layout"

export default function StudentsPage() {
  // Mock student data
  const students = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      quizzesTaken: 8,
      averageScore: 85,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      quizzesTaken: 12,
      averageScore: 92,
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      quizzesTaken: 5,
      averageScore: 78,
      lastActive: "3 days ago",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      quizzesTaken: 10,
      averageScore: 88,
      lastActive: "5 hours ago",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david@example.com",
      quizzesTaken: 3,
      averageScore: 65,
      lastActive: "1 week ago",
    },
  ]

  return (
    <AuthCheck requiredRole="admin">
      <AdminLayout>
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Students</h1>

          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>View and manage student accounts and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Quizzes Taken</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>{student.quizzesTaken}</TableCell>
                      <TableCell>{student.averageScore}%</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.averageScore >= 90
                              ? "success"
                              : student.averageScore >= 75
                                ? "secondary"
                                : student.averageScore >= 60
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {student.averageScore >= 90
                            ? "Excellent"
                            : student.averageScore >= 75
                              ? "Good"
                              : student.averageScore >= 60
                                ? "Average"
                                : "Needs Improvement"}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </AuthCheck>
  )
}
