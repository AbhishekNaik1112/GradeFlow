"use client"

import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navBar"
import { Button } from "@/components/ui/button"
import { ArrowLeftSquareIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Code, Server, Database, Terminal, Mail} from "lucide-react";

const TechStack = () => {
  const router = useRouter();
  
  return (
    <div className="min-h-screen">
      {/* Nav Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex gap-8 flex-grow overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            <div className="p-4 cursor-pointer " onClick={() => router.push("/docs")}>
              <h2 className="text-lg ">Getting Started</h2>
            </div>
            <div className="p-4 rounded-lg bg-gray-200 cursor-pointer">
              <h2 className="text-lg font-semibold">Information</h2>
            </div>
          </nav>
        </aside>

        {/* Main Content Section */}
        <ScrollArea className="h-[calc(100vh-5rem)] overflow-y-auto flex-grow">
          <main className="flex-1 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Understanding the Tech Stack</h1>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold">What is a Tech Stack?</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                A tech stack is a collection of technologies used to build a website or an application.
                Think of it as ingredients in a recipe, each playing a role in making the final product.
              </p>

              <h2 className="text-2xl font-semibold">Technologies Used</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-2 border-l-4 border-blue-500">
                  <div className="flex items-center gap-2">
                    <Code className="h-6 w-6 text-blue-500" />
                    <h3 className="text-lg font-semibold">Frontend (User Interface) – Next.js</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>What is it?</strong> Next.js is a JavaScript framework for fast and efficient web development.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Why did we use it?</strong> It improves SEO, speeds up page loading, and provides a structured development experience.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-2 border-l-4 border-green-500">
                  <div className="flex items-center gap-2">
                    <Server className="h-6 w-6 text-green-500" />
                    <h3 className="text-lg font-semibold">Backend (Logic & Data Handling) – Node.js with Express</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>What is it?</strong> The backend manages all the data and processes user requests.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Why did we use Node.js and Express?</strong> It handles multiple requests efficiently, making the website faster and well-structured.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-2 border-l-4 border-purple-500">
                  <div className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-purple-500" />
                    <h3 className="text-lg font-semibold">Database – MongoDB & LocalStorage</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>What is it?</strong> A storage system for keeping data safe and organized.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Why did we use it?</strong> MongoDB is cloud-based and flexible, while LocalStorage makes the website faster for users.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-2 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-6 w-6 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Sentence Processing – Xenova Transformer</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>What is it?</strong> A tool for understanding and processing text.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Why did we use it?</strong> It enhances text-based interactions and improves sentence breakdowns.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col gap-2 border-l-4 border-red-500">
                  <div className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-red-500" />
                    <h3 className="text-lg font-semibold">Mailing System – Nodemailer</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>What is it?</strong> A tool for sending emails from the website to users.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Why did we use it?</strong> It enables seamless communication between the website and users.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-semibold">Team Members</h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>- Abhishek G Naik</p>
                <p>- Abdulla Shahil</p>
                <p>- Pratham Shailesh Dsouza</p>
                <p>- Musthafa C P</p>
                <p>- Samarth S Alva</p>
              </div>
              <br />
              <br />
              <br />

            </section>
          </main>
        </ScrollArea>
      </div>

      {/* Move to the Main Page */}
      <Button
        className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105"
        onClick={() => router.push("/")}
      >
        <ArrowLeftSquareIcon className="h-4 w-4 text-white" />
      </Button>



    </div>
  );
};

export default TechStack;
