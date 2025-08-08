import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Routes, Route } from "react-router-dom";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { StudentManagement } from "@/components/dashboard/StudentManagement";
import { CampManagement } from "@/components/dashboard/CampManagement";
import { InstructorManagement } from "@/components/dashboard/InstructorManagement";
import { ParentCommunication } from "@/components/dashboard/ParentCommunication";
import { Analytics } from "@/components/dashboard/Analytics";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-4 md:p-6">
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="/students" element={<StudentManagement />} />
              <Route path="/camps" element={<CampManagement />} />
              <Route path="/instructors" element={<InstructorManagement />} />
              <Route path="/communication" element={<ParentCommunication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}