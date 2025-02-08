"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  tasks,
  toggleTaskCompletion
}: {
  tasks: any[];
  toggleTaskCompletion: (taskId: number) => void;
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Filter tasks based on category
  const filteredTasks =
    selectedCategory === "All"
      ? tasks
      : tasks.filter(task => task.category === selectedCategory);

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
          <Select onValueChange={setSelectedCategory} >
            <SelectTrigger className="w-full bg-white border border-gray-200 shadow-none">
              <SelectValue placeholder="Select Category"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Material">Material</SelectItem>
              <SelectItem value="Assignments">Assignments</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 pb-4">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className={`rounded-lg p-3 transition-all ${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white border'}`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors
                    ${task.completed ? 'border-gray-900 bg-gray-900' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {task.completed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
                </button>
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-500">{task.description}</p>
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
