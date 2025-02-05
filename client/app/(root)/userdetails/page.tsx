"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function SignupForm() {
  const [users, setUsers] = useState([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUsers(values)
    console.log("Stored Users:", [values]);  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 md:p-6">
        <img src="logo.svg" alt="GradeFlow Logo" className="h-8 w-8" />
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">Help</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center px-4 py-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-[#06435C] md:text-6xl">GradeFlow</h1>
        <p className="mb-16 text-xl text-gray-600">Smarter Studying, Powered by AI!</p>

        <div className="w-full max-w-md text-center">
          <h2 className="mb-8 text-2xl font-semibold ">Enter your details</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Fullname" className="rounded-full border-gray-300 px-6 py-6" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="rounded-full border-gray-300 px-6 py-6"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full rounded-full bg-black px-8 py-6 text-white hover:bg-gray-800">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
