"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTasks } from "../taskcontext";

export default function TaskManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const { tasks, updateTaskStatus } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const user = localStorage.getItem("userEmail");
  if (!user) {
    router.push("/userdetails");
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://gradeflow.onrender.com/api/gettasks");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data)
        if (data && Array.isArray(data.documents)) {
          const userTasks = data.documents
            .filter((task) => task.userEmail === user)
            .map((task) => ({
              ...task,
              completed: task.status === "complete",
            }));

          updateTaskStatus(userTasks); 
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    updateTaskStatus(taskId, newStatus);

    try {
      const response = await fetch(`https://gradeflow.onrender.com/api/updatetasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus ? "complete" : "incomplete",
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating task:", error);
      updateTaskStatus(taskId, currentStatus); // Revert on error
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 bg-white flex flex-col h-[40%]">
        <div className="max-w-3xl mx-auto flex-1 flex flex-col w-[100%]">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900 text-center">
            Find what you're looking for!
          </h2>

          <div className="relative">
            <Input
              placeholder="Search your tasks..."
              className="mb-6 bg-white rounded-full h-12 p-6 pr-12 appearance-none shadow-none border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X
                className="absolute right-5 top-6 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>

          {loading && <p className="text-center text-gray-500">Loading tasks...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {!loading && !error && tasks.length > 0 ? (
            <ScrollArea ref={scrollContainerRef} className="h-[60vh] w-full overflow-y-auto">
              <div className="space-y-3 w-full">
                {tasks
                  .filter(
                    (task) =>
                      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      task.content.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, showAllTasks ? tasks.length : 10)
                  .map((task) => (
                    <div
                      key={task._id || task.id}
                      className="rounded-lg p-4 bg-white hover:opacity-70 cursor-pointer transition-all border overflow-hidden"
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task._id, task.completed)}
                          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${task.completed ? "border-gray-900 bg-gray-900" : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                          {task.completed && (
                            <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                          )}
                        </button>

                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"
                            }`}>
                            {truncateText(task.title, 50)}
                          </h3>
                          <p className="text-gray-500 text-sm">{truncateText(task.content, 100)}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Show More Button Inside Scrollable Area */}
                {!showAllTasks && tasks.length > 10 && (
                  <div className="py-4 flex justify-center w-full">
                    <Button
                      variant="ghost"
                      className="text-gray-500 hover:bg-gray-100"
                      onClick={() => setShowAllTasks(true)}
                    >
                      Show more results
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            !loading && !error && <p className="text-center text-gray-500">No tasks found.</p>
          )}
        </div>
      </main>

      <Button
        className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}