"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState,useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { HelpCircle, Link2 } from "lucide-react"
import { useRouter } from "next/navigation"; 


const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  userEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

export default function SignupForm() {
  const [users, setUsers] = useState([])
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      userEmail: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setUsers(values)
    console.log("Stored Users:", [values.userEmail]);  
    localStorage.setItem("userEmail",values.userEmail );
    localStorage.setItem("userlogged", JSON.stringify(true));
    router.push("/mainpage");

  }

  return (
    <div className="min-h-screen bg-white">

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

      <main className="container mx-auto flex min-h-[calc(100vh-80px)] flex-col items-center px-4 py-16">
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-[#06435C] md:text-6xl">GradeFlow</h1>
        <p className="mb-16 text-xl text-gray-600">Smarter Studying, Powered by AI!</p>

        <div className="w-full max-w-md text-center">
          <h2 className="mb-8 text-2xl font-semibold ">Enter your details</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center items-center">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Fullname" className="rounded-full border-gray-300 px-6 py-6 w-[30vw]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="userEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="rounded-full border-gray-300 px-6 py-6 w-[30vw]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="rounded-full bg-black px-8 py-6 text-white hover:bg-gray-800  w-[12vw]">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  )
}
