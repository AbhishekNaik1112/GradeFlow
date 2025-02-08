"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default function Sidebar({
  tasks: initialTasks,
}: {
  tasks: any[];
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle task completion status
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

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
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white border border-gray-200 shadow-none">
              <SelectValue placeholder="Select Category" />
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
              className={`rounded-lg p-3 border transition-all ${task.completed ? 'bg-gray-50 opacity-75 border-white' : 'bg-white '}`}
            >
              <div className="flex items-start gap-3">
                <div className="checkbox-wrapper-12 scale-90">
                  <div className="cbx">
                    <input
                      type="checkbox"
                      id={`cbx-${task.id}`}
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                    />
                    <label htmlFor={`cbx-${task.id}`}></label>
                    <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                      <path d="M2 8.36364L6.23077 12L13 2"></path>
                    </svg>
                  </div>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter id="goo-12">
                        <feGaussianBlur result="blur" stdDeviation="4" in="SourceGraphic"></feGaussianBlur>
                        <feColorMatrix result="goo-12" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" mode="matrix" in="blur"></feColorMatrix>
                        <feBlend in2="goo-12" in="SourceGraphic"></feBlend>
                      </filter>
                    </defs>
                  </svg>
                </div>

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
