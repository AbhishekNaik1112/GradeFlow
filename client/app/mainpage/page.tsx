"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { ChevronDown, HelpCircle, Link2, Check, ArrowUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function TaskManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tasks, setTasks] = useState([
    { id: 1, title: "Human resource documentations", description: "Organize and update HR policies, employee records, and compliance documents.", completed: false },
    { id: 2, title: "HR excel sheet analytics", description: "Analyze HR data using Excel, focusing on employee performance, attendance, and recruitment trends.", completed: true },
    { id: 3, title: "Performance Appraisal Analysis", description: "Review and document employee performance evaluations for HR insights.", completed: false }
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 pb-0">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Today's tasks</h1>
            <p className="text-sm text-gray-500 mt-1">Saturday, 1 February - 12:12pm</p>
          </div>

          <div className="mb-4">
            <button className="flex w-full items-center justify-between rounded-lg p-2.5 hover:bg-gray-50 transition-colors">
              <span className="text-gray-700">Reviews</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 pb-4">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                {...task}
                toggleCompletion={() => toggleTaskCompletion(task.id)}
              />
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 rounded-lg transition-colors">
            Add a task
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <nav className="flex items-center justify-between border-b p-4 bg-white">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 gap-1.5">
              Help <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-50 gap-1.5">
              Docs <Link2 className="h-4 w-4" />
            </Button>
          </div>
        </nav>

        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Find what you're looking for!</h2>

            <Input
              type="search"
              placeholder="Search your tasks..."
              className="mb-6 bg-white rounded-lg h-12 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ScrollArea className="h-[500px]">
              <div className="space-y-3">
                {tasks.map(task => (
                  <SearchResult
                    key={task.id}
                    {...task}
                    toggleCompletion={() => toggleTaskCompletion(task.id)}
                  />
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

function TaskItem({ title, description, completed, toggleCompletion }: 
  { title: string, description: string, completed: boolean, toggleCompletion: () => void }) {
  return (
    <div className={`rounded-lg p-3 transition-all ${completed ? 'bg-gray-50 opacity-75' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompletion}
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors
            ${completed ? 'border-gray-900 bg-gray-900' : 'border-gray-300 hover:border-gray-400'}`}
        >
          {completed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </button>
        <div className="flex-1">
          <h3 className={`font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  )
}

function SearchResult({ title, description, completed, toggleCompletion }: 
  { title: string, description: string, completed: boolean, toggleCompletion: () => void }) {
  return (
    <div className={`rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all ${completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={toggleCompletion}
          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors
            ${completed ? 'border-gray-900 bg-gray-900' : 'border-gray-300 hover:border-gray-400'}`}
        >
          {completed && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
        </button>
        <div className="flex-1">
          <h3 className={`font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}