import type { Metadata } from "next";
import Sidebar from "@/components/ui/SidebarCustom";
import Navbar from "@/components/ui/navBar";

export const metadata: Metadata = {
  title: "GradeFlow",
  description: "Meetings on the go",
  icons: {
    icon: "/icons/ovid-header.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50">

          <Sidebar
            tasks={[
              {
                id: 1,
                title: "Human resource documentations",
                description:
                  "Organize and update HR policies, employee records, and compliance documents.",
                completed: false,
                category: "Material",
              },
              {
                id: 2,
                title: "HR excel sheet analytics",
                description:
                  "Analyze HR data using Excel, focusing on employee performance, attendance, and recruitment trends.",
                completed: true,
                category: "Assignments",
              },
              {
                id: 3,
                title: "Performance Appraisal Analysis",
                description:
                  "Review and document employee performance evaluations for HR insights.",
                completed: false,
                category: "Material",
              },
              {
                id: 4,
                title: "Performance Appraisal Analysis",
                description:
                  "Review and document employee performance evaluations for HR insights.",
                completed: false,
                category: "Material",
              },
              {
                id: 5,
                title: "Performance Appraisal Analysis",
                description:
                  "Review and document employee performance evaluations for HR insights.",
                completed: false,
                category: "Material",
              },
              {
                id: 6,
                title: "Performance Appraisal Analysis",
                description:
                  "Review and document employee performance evaluations for HR insights.",
                completed: false,
                category: "Material",
              },
              {
                id: 7,
                title: "Performance Appraisal Analysis",
                description:
                  "Review and document employee performance evaluations for HR insights.",
                completed: false,
                category: "Material",
              },
            ]}
          // toggleTaskCompletion={(taskId: number) => {
          //   console.log(`Task ${taskId} toggled`); 
          // }}

          
          />

          <div className="flex-1 flex flex-col">
            <Navbar />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
