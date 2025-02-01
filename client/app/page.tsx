import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Search, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link";


export default function Page() {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 md:p-6 lg:p-8">
        <Image
          src="/logo.svg"
          alt="GradeFlow Logo"
          width={32}
          height={32}
          className="h-8 w-8 transition-opacity hover:opacity-80"
        />
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="text-gray-600 hover:text-[#06435C] transition-colors duration-200">
            Help
          </a>
          <a href="#" className="text-gray-600 hover:text-[#06435C] transition-colors duration-200">
            Docs
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 lg:py-16 text-center flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#06435C] md:text-5xl lg:text-6xl transition-all duration-300 hover:scale-105">
            GradeFlow
          </h1>
          <p className="mb-12 text-lg text-gray-600 md:text-xl lg:mb-16">
            Smarter Studying, Powered by AI!
          </p>
        </div>

        {/* Feature Cards */}
        <div className="w-full max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
          {[
            { icon: Star, title: "Smart Categorized To-Do List" },
            { icon: Search, title: "AI-Powered Task Search" },
            { icon: Bell, title: "Deadline Reminder & Insights" }
          ].map((feature, index) => (
            <Card 
              key={index}
              className="border-2 hover:border-[#06435C] transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="rounded-full bg-blue-50 p-3 transition-colors duration-300 hover:bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-[#06435C]">{feature.title}</h2>
                <p className="text-center text-gray-600">
                  {index === 0 && "Organize tasks into categories like 'Assignments,' 'Exams,' or 'Projects'"}
                  {index === 1 && "Intelligent search to find any task instantly from hundreds of items"}
                  {index === 2 && "Get AI-generated reminders to improve your study habits"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {index === 0 && "Track progress and stay on top of deadlines"}
                  {index === 1 && "Search by keywords, dates, or categories"}
                  {index === 2 && "Never miss an important deadline!"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/mainpage">
        <Button 
          className="mt-12 bg-[#06435C] px-8 py-6 text-lg hover:bg-[#053447] transition-transform duration-300 hover:scale-105"
          size="lg"
        >
          Get Started
        </Button>
        </Link>
      </main>
    </div>
  )
}