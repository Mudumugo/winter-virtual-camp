import { SidebarProvider } from "@/components/ui/sidebar";
import { InstructorSidebar } from "@/components/instructor/InstructorSidebar";
import { InstructorHeader } from "@/components/instructor/InstructorHeader";
import { Routes, Route } from "react-router-dom";
import { InstructorOverview } from "@/components/instructor/InstructorOverview";
import { InstructorMyCamps } from "@/components/instructor/InstructorMyCamps";
import { InstructorSchedule } from "@/components/instructor/InstructorSchedule";
import { InstructorStudents } from "@/components/instructor/InstructorStudents";
import { InstructorMessages } from "@/components/instructor/InstructorMessages";
import { InstructorResources } from "@/components/instructor/InstructorResources";
import { InstructorProfile } from "@/components/instructor/InstructorProfile";

export default function InstructorDashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <InstructorSidebar />
        
        <main className="flex-1 flex flex-col">
          <InstructorHeader />
          
          <div className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<InstructorOverview />} />
              <Route path="/my-camps" element={<InstructorMyCamps />} />
              <Route path="/schedule" element={<InstructorSchedule />} />
              <Route path="/students" element={<InstructorStudents />} />
              <Route path="/messages" element={<InstructorMessages />} />
              <Route path="/resources" element={<InstructorResources />} />
              <Route path="/profile" element={<InstructorProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}