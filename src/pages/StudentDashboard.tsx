import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { StudentHeader } from "@/components/student/StudentHeader";
import { Routes, Route } from "react-router-dom";
import { StudentOverview } from "@/components/student/StudentOverview";
import { StudentMyCamps } from "@/components/student/StudentMyCamps";
import { StudentSchedule } from "@/components/student/StudentSchedule";
import { StudentAssignments } from "@/components/student/StudentAssignments";
import { StudentMessages } from "@/components/student/StudentMessages";
import { StudentResources } from "@/components/student/StudentResources";
import { StudentProfile } from "@/components/student/StudentProfile";

export default function StudentDashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <StudentSidebar />
        
        <main className="flex-1 flex flex-col">
          <StudentHeader />
          
          <div className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<StudentOverview />} />
              <Route path="/my-camps" element={<StudentMyCamps />} />
              <Route path="/schedule" element={<StudentSchedule />} />
              <Route path="/assignments" element={<StudentAssignments />} />
              <Route path="/messages" element={<StudentMessages />} />
              <Route path="/resources" element={<StudentResources />} />
              <Route path="/profile" element={<StudentProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}