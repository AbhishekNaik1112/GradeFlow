"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of a task
interface Task {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  status: string;
  completed: boolean;
  userEmail: string;
  deadline?: string;
  type?: string;
}

// Define the shape of the context
interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTaskStatus: (taskId: string, newStatus: boolean) => void;
}

// Create the context
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Create a provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Function to update task status
  const updateTaskStatus = (taskId: string, newStatus: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, completed: newStatus, status: newStatus ? "complete" : "incomplete" }
          : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, updateTaskStatus }}>
      {children}
    </TasksContext.Provider>
  );
};

// Custom hook to use the context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};