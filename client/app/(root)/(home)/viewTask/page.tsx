"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Task {
  title: string;
  deadline: string;
  type: 'Material' | 'Assignment';
  status: 'complete' | 'incomplete';
  content: string;
}

export default function TaskCard() {
  const [isCompleted, setIsCompleted] = useState(status === "complete");
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      try {
        const response = await fetch(`https://gradeflow.onrender.com/api/findtask/${taskId}`);
        if (!response.ok) throw new Error('Failed to fetch tasks');
  
        const data = await response.json();
        console.log("data-----", data);
        setTask(data.document);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTask();
  }, [taskId]);

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

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
    }
  };

  return (
    <Card className="max-w-full h-screen p-12 rounded-none border-none">
      <Link href="/mainpage" className="ml-7">
        <div className="w-fit p-2 hover:bg-gray-100 rounded-lg transition-all">
          <Image
            src="/back.png"
            alt="Logo"
            width={24}
            height={24}
            className="h-5 w-5 cursor-pointer"
          />
        </div>
      </Link>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Date created: {task?.createdAt}</div>

          <div className="flex items-center gap-2">
            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input
                  type="checkbox"
                  id="cbx-12"
                  checked={isCompleted}
                  onChange={() => toggleTask(task?._id, task?.completed)}
                  // onChange={() => setIsCompleted(!isCompleted)}
                />
                <label htmlFor="cbx-12"></label>
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
            <h1 className="text-3xl font-semibold">{task?.title}</h1>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="text-sm font-normal bg-zinc-900 text-white hover:bg-zinc-900 px-2 py-1">
              {task?.type}
            </Badge>

            <Badge
              variant={isCompleted ? "secondary" : "destructive"}
              className={`text-sm font-normal flex items-center gap-1 px-2 py-1 ${isCompleted ? "bg-green-500 hover:bg-green-500 text-white" : "bg-red-500 hover:bg-red-500"}`}
            >
              {isCompleted ? "Complete" : "Incomplete"}
              {!isCompleted && <X className="h-3 w-3" />}
            </Badge>

            <Badge className="text-muted-foreground px-2 py-1 text-sm font-normal" variant="outline">
              Deadline: {task?.deadline}
            </Badge>
          </div>

          <div className="text-muted-foreground whitespace-pre-line bg-muted/40 p-4 bg-gray-50 rounded-3xl border border-gray-100">
            {task?.content}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
