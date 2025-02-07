"use client";

import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Check, X } from "lucide-react";

export default function TaskManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "Human resource documentations", description: "Organize and update HR policies, employee records, and compliance documents.", completed: false },
    { id: 2, title: "HR excel sheet analytics", description: "Analyze HR data using Excel, focusing on employee performance, attendance, and recruitment trends.", completed: true },
    { id: 3, title: "Performance Appraisal Analysis", description: "Review and document employee performance evaluations for HR insights.", completed: false },
    { id: 4, title: "Recruitment Strategy Review", description: "Analyze past recruitment efforts and suggest improvements.", completed: false },
    { id: 5, title: "Employee Satisfaction Survey", description: "Design and distribute employee satisfaction surveys.", completed: false },
    // { id: 6, title: "Workplace Safety Compliance", description: "Ensure that the workplace adheres to safety regulations.", completed: false },
    // { id: 7, title: "Training Program Development", description: "Develop training programs for employee upskilling.", completed: false },
    // { id: 8, title: "Onboarding Process Optimization", description: "Improve onboarding experience for new hires.", completed: false },
    // { id: 9, title: "HR Policy Updates", description: "Review and update outdated HR policies.", completed: false },
    // { id: 10, title: "Employee Exit Interviews", description: "Conduct and document exit interviews.", completed: false },
    // { id: 11, title: "Diversity and Inclusion Strategy", description: "Evaluate diversity efforts and propose new initiatives.", completed: false }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 bg-gray-50 flex flex-col">

        <div className="max-w-3xl mx-auto flex-1 flex flex-col">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Find what you're looking for!</h2>

          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search your tasks..."
              className="mb-6 bg-white rounded-full h-12 p-5 shadow-sm pr-12 appearance-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>

          {/* Scrollable Task List */}
          <ScrollArea ref={scrollContainerRef} className="flex-1">

            <div className="space-y-3">
              {tasks.slice(0, showAllTasks ? tasks.length : 10).map((task) => (
                <div
                  key={task.id}
                  className={`rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all ${
                    task.completed ? "opacity-75" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => {
                        setTasks((prevTasks) =>
                          prevTasks.map((t) =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          )
                        );
                      }}
                      className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors
                        ${task.completed ? "border-gray-900 bg-gray-900" : "border-gray-300 hover:border-gray-400"}`}
                    >
                      {task.completed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                        {task.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{task.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Results Button */}
            {!showAllTasks && tasks.length > 10 && (
              <div className="py-4 flex justify-center">
                <Button variant="ghost" className="text-gray-600 hover:bg-gray-100" onClick={() => setShowAllTasks(true)}>
                  Show more results
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      </main>

      {/* Scroll to Top Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}
