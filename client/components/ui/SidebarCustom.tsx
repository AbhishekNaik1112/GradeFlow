"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { useTasks } from "@/app/(root)/(home)/taskcontext"

export default function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { tasks, setTasks, updateTaskStatus } = useTasks();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = localStorage.getItem("userEmail");
        if (!user) return;

        const response = await fetch("https://gradeflow.onrender.com/api/gettasks");
        if (!response.ok) throw new Error("Failed to fetch tasks");

        const data = await response.json();
        if (data && Array.isArray(data.documents)) {
          const today = new Date().toISOString().split("T")[0];

          const userTasks = data.documents
            .filter((task) => task.userEmail === user && task.deadline?.startsWith(today))
            .map((task) => ({
              ...task,
              completed: task.status === "complete",
            }));

          setTasks(userTasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [setTasks]);

  const toggleTaskCompletion = async (taskId: string, currentStatus: boolean) => {
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

  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter((task) => task.type === selectedCategory);

  return (
    <div className="w-1/4 h-screen border-r bg-gray-50 flex flex-col">
      <div className="p-8 pb-0">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Today's tasks</h1>
          <p className="text-sm font-extralight text-gray-400 mt-1">
            {currentTime.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })} -{" "}
            {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        {/* Select for Category Filtering */}
        <div className="mb-4">
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white border border-gray-200 shadow-none">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="material">Material</SelectItem>
              <SelectItem value="assignment">Assignments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className={`rounded-lg p-3 border transition-all ${task.completed ? "bg-gray-50 opacity-75 border-white" : "bg-white"}`}
            >
              <div className="flex items-start gap-3">
                <div className="checkbox-wrapper-12 scale-90">
                  <div className="cbx">
                    <input
                      type="checkbox"
                      id={`cbx-${task._id}`}
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task._id, task.completed)}
                    />
                    <label htmlFor={`cbx-${task._id}`}></label>
                    <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description || task.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Link href="/addtask">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 rounded-lg transition-colors">
            Add a task
          </Button>
        </Link>
      </div>
    </div>
  );
}
