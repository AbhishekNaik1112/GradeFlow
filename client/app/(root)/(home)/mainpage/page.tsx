"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HelpCircle, Link2, ArrowUp, Check, X } from "lucide-react"

export default function TaskManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tasks, setTasks] = useState([
    { id: 1, title: "Human resource documentations", description: "Organize and update HR policies, employee records, and compliance documents.", completed: false },
    { id: 2, title: "HR excel sheet analytics", description: "Analyze HR data using Excel, focusing on employee performance, attendance, and recruitment trends.", completed: true },
    { id: 3, title: "Performance Appraisal Analysis", description: "Review and document employee performance evaluations for HR insights.", completed: false }
  ])

  return (
    <div className="h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Find what you're looking for!</h2>

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

            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all ${task.completed ? 'opacity-75' : ''}`}
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
                        <p className="text-gray-500 text-sm">{task.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button variant="ghost" className="mt-4 text-gray-600 hover:bg-gray-100">
              Show more results
            </Button>
          </div>

          <Button className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105">
            <ArrowUp className="h-4 w-4 text-white" />
          </Button>
        </main>
      </div>
    </div>
  )
}