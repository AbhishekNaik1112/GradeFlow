"use client"
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/navBar"
import { Button } from "@/components/ui/button"
import { ArrowLeftSquareIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";



export default function DocumentationPage() {
    const router = useRouter();

    return (
        <div className={`min-h-screen`}>

            {/* Nav Bar */}
            <Navbar />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 flex gap-8 flex-grow overflow-y-auto">
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0">
                    <nav className="space-y-1">
                        <div className="p-4 rounded-lg bg-gray-200 cursor-pointer">
                            <h2 className="text-lg font-semibold">Getting Started</h2>
                        </div>
                        <div className="p-4" onClick={() => router.push("/docs/styles")}>
                            <h2 className="text-lg cursor-pointer">Information</h2>
                        </div>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <ScrollArea className="h-[calc(100vh-4rem)]">
                    <main className="flex-1 max-w-4xl overflow-y-auto">
                        <h1 className="text-4xl font-bold mb-8">Getting Started with GradeFlow</h1>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold">What is GradeFlow?</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                GradeFlow is your personal study assistant that helps you stay on top of assignments,
                                deadlines, and grades. It acts as an all-in-one academic planner, making it
                                easier to track your study progress and improve productivity.
                                With built-in AI assistance, GradeFlow optimizes your study schedule and provides
                                insights to help you perform better.
                            </p>

                            <h2 className="text-2xl font-semibold">Why Use GradeFlow?</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Have you ever forgotten an assignment deadline? Or struggled to keep track of your
                                grades across multiple subjects? Managing schoolwork can be overwhelming,
                                but GradeFlow simplifies it all.
                                <br />
                                <br />✅ Stay Organized: Keep track of assignments, deadlines, and grades in one place.
                                <br />✅ AI-Powered Assistance: Get smart study recommendations tailored to your progress.
                                <br />✅ Attach Notes: Easily save important notes alongside your study materials and lectures.
                                <br />✅ Boost Productivity: Plan your studies effectively and avoid last-minute cramming.
                            </p>

                            <h2 className="text-2xl font-semibold">Where does it come from?</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                GradeFlow was created with students in mind. We understand that academic life is challenging,
                                and we wanted to build a tool that makes studying stress-free and effective.
                                Whether you're in high school, college, or preparing for competitive exams,
                                GradeFlow is designed to help you succeed.
                            </p>

                            <h2 className="text-2xl font-semibold">How to Get Started</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                <strong>Step 1: Sign Up and Set Your Goals</strong>
                                <br />
                                Create your account and set your academic goals. GradeFlow will tailor your study plan accordingly.
                                <br /><br />

                                <strong>Step 2: Add Your Subjects and Assignments</strong>
                                <br />
                                Input your subjects, upcoming assignments, and deadlines. The AI will help you prioritize them.
                                <br /><br />

                                <strong>Step 3: Track Your Progress</strong>
                                <br />
                                Use the dashboard to monitor your study hours, completed assignments, and grades over time.
                                <br /><br />

                                <strong>Step 4: Stay Consistent</strong>
                                <br />
                                GradeFlow will send reminders and study tips to keep you motivated and on track.
                            </p>

                            <h2 className="text-2xl font-semibold">Conclusion</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                GradeFlow is more than just a planner—it’s your study companion. With AI-driven insights,
                                easy tracking, and a user-friendly interface, managing your academics has never been easier.
                                Start using GradeFlow today and take control of your learning journey!
                            </p>

                            <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                🚀 Stay organized. Study smarter. Succeed with GradeFlow!
                            </p>

                        </section>
                    </main>
                </ScrollArea>
            </div>

            {/* Move to the Main  */}
            <Button
                className="fixed bottom-6 right-6 rounded-full bg-gray-900 hover:bg-gray-800 h-12 w-12 shadow-lg transition-transform hover:scale-105"
                onClick={() => router.push("/")}
            >
                <ArrowLeftSquareIcon className="h-4 w-4 text-white" />
            </Button>

        </div>
    )
}