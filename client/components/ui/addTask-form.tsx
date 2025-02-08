"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useRouter } from "next/navigation"; 


interface Task {
  title: string;
  description: string;
  deadline: Date | undefined;
  userEmail: string;
  type: string;
  status: string;
}

export default function AddTask() {
  const email = localStorage.getItem("userEmail") || "";
  const router = useRouter();
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    deadline: undefined,
    userEmail: email,
    type: "",
    status: "incomplete"
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTask((prev) => ({
      ...prev,
      deadline: prev.deadline ? new Date(prev.deadline) : undefined,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!task.title || !task.description || !task.deadline || !task.type) {
      setError("All fields are required!");
      return;
    }
  
    const taskData = {
      title: task.title,
      content: task.description, 
      deadline: task.deadline.toISOString(), 
      userEmail: task.userEmail,
      type: task.type,
      status: task.status,
    };
  
    try {
      const response = await fetch("https://gradeflow.onrender.com/api/addtasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
  
      setError("");
      router.push("/mainpage");
    } catch (err) {
      setError("Error submitting task. Please try again.");
      console.error("Error:", err);
    }
  };
  

  const isFormValid = task.title && task.description && task.deadline && task.type;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Add a Task</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              placeholder="Enter your task title..."
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="p-6 rounded-full"
            />

            <Textarea
              placeholder="Describe your task here..."
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              className="min-h-[200px] max-h-[400px] resize-y rounded-3xl p-6"
              maxLength={1200}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm">Select Deadline</label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal rounded-full p-6"
                      onClick={() => setOpen(true)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {task.deadline ? format(new Date(task.deadline), "MM/dd/yyyy") : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded-2xl p-2 " align="start">
                    <CalendarComponent
                      mode="single"
                      selected={task.deadline}
                      onSelect={(date) => {
                        if (date && date.getTime() >= new Date().setHours(0, 0, 0, 0)) {
                          setTask({ ...task, deadline: date });
                          setError("");
                        }
                      }}
                      disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                      initialFocus
                    />
                    <div className="flex justify-end gap-2 p-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTask({ ...task, deadline: undefined });
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        OK
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm">Type</label>
                <Select value={task.type} onValueChange={(value) => setTask({ ...task, type: value })}>
                  <SelectTrigger className="rounded-full p-6">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="cursor-pointer rounded-full p-3" value="material">
                      Material
                    </SelectItem>
                    <SelectItem className="cursor-pointer rounded-full p-3" value="assignment">
                      Assignment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <Button type="submit" className="w-full rounded-full p-6" disabled={!isFormValid}>
              Submit Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}