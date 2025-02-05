"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface Task {
  title: string
  description: string
  deadline: Date | undefined
  type: string
}

export default function AddTask() {
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    deadline: undefined,
    type: "",
  })

  useEffect(() => {
    setTask((prev) => ({
      ...prev,
      deadline: prev.deadline ? new Date(prev.deadline) : undefined,
    }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Task:", task)
    // Handle task submission
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Add a task</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                placeholder="Enter your task title..."
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                className="p-6 rounded-full"
              />
            </div>

            <Textarea
              placeholder="Describe your task here..."
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="min-h-[200px] max-h-[400px] resize-y rounded-3xl p-6"
              maxLength={1200}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deadline Selector */}
              <div className="space-y-2">
                <label className="text-sm">Select deadline</label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal rounded-full p-6">
                      <Calendar className="mr-2 h-4 w-4" />
                      {task.deadline ? format(new Date(task.deadline), "MM/dd/yyyy") : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded-2xl p-2 " align="start">
                    <CalendarComponent
                      mode="single"
                      selected={task.deadline}
                      onSelect={(date) => setTask({ ...task, deadline: date || undefined })}
                      initialFocus
                    />
                    <div className="flex justify-end gap-2 p-2 border-t">
                      <Button variant="outline" size="sm" onClick={() => setTask({ ...task, deadline: undefined })}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => console.log("Date selected:", task.deadline)}>
                        OK
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Task Type Selector */}
              <div className="space-y-2">
                <label className="text-sm">Type</label>
                <Select value={task.type} onValueChange={(value) => setTask({ ...task, type: value })}>
                  <SelectTrigger className="rounded-full p-6">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer rounded-full p-3" value="material">Material</SelectItem>
                    <SelectItem className="cursor-pointer rounded-full p-3" value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-full p-6">
              Submit Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
