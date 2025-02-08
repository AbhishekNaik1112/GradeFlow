"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface TaskCardProps {
  title: string;
  createdDate: string;
  deadline: string;
  type: "Material" | "Assignment";
  status: "Complete" | "Incomplete";
  description: string;
}

export default function TaskCard({
  title = "Human resource documentations",
  createdDate = "25/01/2025",
  deadline = "02/02/2025",
  type = "Material",
  status = "Incomplete",
  description = "Organize and update HR policies, employee records, and compliance documents. Organize and schedule employee training programs based on skill gaps and company needs.\n\nCompile data and insights on diversity and inclusion in recent recruitment efforts.",
}: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(status === "Complete");

  return (
    <Card className="max-w-full h-screen p-12 rounded-none border-none">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">Date created: {createdDate}</div>

          <div className="flex items-center gap-2">
            <div className="checkbox-wrapper-12">
              <div className="cbx">
                <input
                  type="checkbox"
                  id="cbx-12"
                  checked={isCompleted}
                  onChange={() => setIsCompleted(!isCompleted)} 
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
            <h1 className="text-3xl font-semibold">{title}</h1>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="text-sm font-normal bg-zinc-900 text-white hover:bg-zinc-900 px-2 py-1">
              {type}
            </Badge>

            <Badge
              variant={isCompleted ? "secondary" : "destructive"}
              className={`text-sm font-normal flex items-center gap-1 px-2 py-1 ${isCompleted ? "bg-green-500 hover:bg-green-500 text-white" : "bg-red-500 hover:bg-red-500"}`}
            >
              {isCompleted ? "Complete" : "Incomplete"}
              {!isCompleted && <X className="h-3 w-3" />}
            </Badge>

            <Badge className="text-muted-foreground px-2 py-1 text-sm font-normal" variant="outline">
              Deadline: {deadline}
            </Badge>
          </div>

          <div className="text-muted-foreground whitespace-pre-line bg-muted/40 p-4 bg-gray-50 rounded-3xl border border-gray-100">
            {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
