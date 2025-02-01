"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"

export default function Sidebar({
  tasks,
  toggleTaskCompletion
}: {
  tasks: any[]
  toggleTaskCompletion: (taskId: number) => void
}) {
  return (
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
            <div
              key={task.id}
              className={`rounded-lg p-3 transition-all ${task.completed ? 'bg-gray-50 opacity-75' : 'bg-white'}`}
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
        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 rounded-lg transition-colors">
          Add a task
        </Button>
      </div>
    </div>
  )
}