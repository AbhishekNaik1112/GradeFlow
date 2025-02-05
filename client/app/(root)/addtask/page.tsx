'use client'

import AddTask from '@/components/ui/addTask-form'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/ui/sidebar'
import { HelpCircle, Link2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useState } from "react"


const page = () => {
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


    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />

      {/* Main Content */}
      <div className="h-screen bg-gray-50 w-3/4">
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

        <AddTask/>
      </div>

    </div>



    // </div>





  )

}

export default page

