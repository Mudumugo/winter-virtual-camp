import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Star, Calendar, Target } from "lucide-react";

export function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
        <p className="text-muted-foreground">Track performance and insights across all camps</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">$124,680</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+18.2%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+12%</span> new enrollments
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">94%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+3%</span> from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">4.8</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent font-medium">+0.2</span> improvement
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Trends */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Enrollment Trends</CardTitle>
            <CardDescription>Monthly student enrollment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Chart visualization would go here</p>
                <p className="text-sm text-muted-foreground mt-1">Enrollment trending upward +18%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camp Performance */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Camp Performance</CardTitle>
            <CardDescription>Completion rates by camp type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Web Development", completion: 96, students: 45 },
                { name: "Python Programming", completion: 94, students: 38 },
                { name: "Game Development", completion: 92, students: 32 },
                { name: "Robotics", completion: 90, students: 28 }
              ].map((camp) => (
                <div key={camp.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-card-foreground font-medium">{camp.name}</span>
                    <span className="text-muted-foreground">{camp.completion}% completion</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${camp.completion}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">{camp.students} students enrolled</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Reports</CardTitle>
          <CardDescription>Generated reports and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "Monthly Revenue Report - July 2024",
                date: "July 31, 2024",
                type: "Financial",
                status: "Generated"
              },
              {
                title: "Student Progress Summary - Q2",
                date: "June 30, 2024",
                type: "Academic",
                status: "Generated"
              },
              {
                title: "Parent Satisfaction Survey Results",
                date: "June 15, 2024",
                type: "Feedback",
                status: "Generated"
              }
            ].map((report, index) => (
              <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                <div>
                  <h4 className="font-medium text-card-foreground">{report.title}</h4>
                  <p className="text-sm text-muted-foreground">{report.type} • {report.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {report.status}
                  </span>
                  <button className="text-sm text-primary hover:underline">Download</button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}