"use client";

import { square } from 'ldrs';

square.register();

import { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTasks } from "../taskcontext";

export default function TaskManager() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllTasks, setShowAllTasks] = useState(false);
  const { tasks, updateTaskStatus, setTasks } = useTasks();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const router = useRouter();

  const user = localStorage.getItem("userEmail");
  if (!user) {
    router.push("/userdetails");
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://gradeflow.onrender.com/api/gettasks");
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        if (data && Array.isArray(data.documents)) {
          const userTasks = data.documents
            .filter((task) => task.userEmail === user)
            .map((task) => ({
              ...task,
              completed: task.status === "complete",
            }));

          setTasks(userTasks);
        } else {
          console.error("Unexpected API response format:", data);
          setTasks([]);
        }
      } catch (err: any) {
        console.error("Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, setTasks]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]); 
      return;
    }

    const searchTasks = async () => {
      try {
        setIsSearching(true);
        setSearchError(null);

        console.log(searchQuery)
        const response = await fetch("https://gradeflow.onrender.com/api/searchtasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchQuery,
            userEmail: user,
          }),
        });


        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setSearchResults(data.results || []); 
      } catch (err: any) {
        console.error("Search Error:", err);
        setSearchError(err.message);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchTasks();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, user]);

  const toggleTask = async (taskId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    updateTaskStatus(taskId, newStatus);

    setSearchResults((prevResults) =>
      prevResults.map((task) =>
        task._id === taskId ? { ...task, status: newStatus ? "complete" : "incomplete" } : task
      )
    );

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
      updateTaskStatus(taskId, currentStatus);
      setSearchResults((prevResults) =>
        prevResults.map((task) =>
          task._id === taskId ? { ...task, status: currentStatus ? "complete" : "incomplete" } : task
        )
      );
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 bg-white flex flex-col h-[40%]">
        <div className="max-w-3xl mx-auto flex-1 flex flex-col w-[100%]">
          <h2 className="mb-6 text-3xl font-semibold text-gray-900 text-center">
            Find what you're looking for!
          </h2>

          <div className="relative">
            <Input
              placeholder="Search your tasks..."
              className="mb-6 bg-white rounded-full h-12 p-6 pr-12 appearance-none shadow-none border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <X
                className="absolute right-5 top-6 transform -translate-y-1/2 h-5 w-5 text-gray-500 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>

          {isSearching && (
            <center className="h-[50vh] flex justify-center items-center">
              <l-square
                size="35"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="1.2"
                color="#074E6C"
                className="text-center"
              ></l-square>
            </center>
          )}

          {searchError && (
            <p className="text-center text-red-500">{searchError}</p>
          )}

          {!isSearching && searchResults.length > 0 && (
            <ScrollArea className="h-[60vh] w-full overflow-y-auto">
              <div className="space-y-3 w-full">
                {searchResults.map((result) => {
                  const completed = result.status === "complete";
                  return (
                    <div
                      key={result._id || result.id}
                      className={`rounded-lg p-4 bg-white hover:opacity-70 border hover:border-gray-500 cursor-pointer transition-all overflow-hidden ${completed ? "text-gray-500 border-white bg-slate-50" : "text-gray-900 border"
                        }`}
                    >
                      <div className="flex items-start gap-3">

                        <div className="checkbox-wrapper-12 scale-90">
                          <div className="cbx">
                            <input
                              type="checkbox"
                              id={`cbx-${result._id}`}
                              checked={completed}
                              onChange={() => toggleTask(result._id, completed)}
                            />
                            <label htmlFor={`cbx-${result._id}`}></label>
                            <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                              <path d="M2 8.36364L6.23077 12L13 2"></path>
                            </svg>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className={`font-medium ${completed ? "text-gray-500 line-through" : "text-gray-900"
                            }`}>
                            {truncateText(result.title, 50)}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {truncateText(result.content, 100)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}

          {!isSearching && searchResults.length === 0 && (
            <>
              {loading && (
                <center className="h-[50vh] flex justify-center items-center">
                  <l-square
                    size="35"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="1.2"
                    color="#074E6C"
                    className="text-center"
                  ></l-square>
                </center>
              )}

              {!loading && !error && tasks.length > 0 ? (
                <ScrollArea ref={scrollContainerRef} className="h-[60vh] w-full overflow-y-auto">
                  <div className="space-y-3 w-full">
                    {tasks
                      .filter(
                        (task) =>
                          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.content.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, showAllTasks ? tasks.length : 10)
                      .map((task) => (
                        <div
                          key={task._id || task.id}
                          className={`rounded-lg p-4 bg-white hover:opacity-70 border hover:border-gray-500 cursor-pointer transition-all overflow-hidden ${task.completed ? "text-gray-500 border-white bg-slate-50" : "text-gray-900 border"
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="checkbox-wrapper-12 scale-90">
                              <div className="cbx">
                                <input
                                  type="checkbox"
                                  id={`cbx-${task._id}`}
                                  checked={task.completed}
                                  onChange={() => toggleTask(task._id, task.completed)}
                                />
                                <label htmlFor={`cbx-${task._id}`}></label>
                                <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                                </svg>
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className={`font-medium ${task.completed ? "text-gray-500 line-through" : "text-gray-900"
                                }`}>
                                {truncateText(task.title, 50)}
                              </h3>
                              <p className="text-gray-500 text-sm">{truncateText(task.content, 100)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              ) : (
                !loading && !error && <p className="text-center text-gray-500">No tasks found.</p>
              )}
            </>
          )}
        </div>
      </main>

      <Button
        className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-4 w-4 text-white" />
      </Button>
    </div>
  );
}