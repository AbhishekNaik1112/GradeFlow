"use client"
import Navbar from '@/components/ui/navBar'
import React from 'react'

import { useState } from "react"
import { Search } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is GradeFlow?",
    answer:
      "GradeFlow is an AI-powered study tracker that helps students manage their study progress, assignments, deadlines, and grades in one place. It also allows students to attach notes to their study materials for better organization."
  },
  {
    question: "How does GradeFlow help improve my study efficiency?",
    answer:
      "GradeFlow streamlines academic planning by tracking assignments, deadlines, and grades automatically. It also provides AI-driven study insights to help optimize your schedule for maximum productivity."
  },
  {
    question: "What information is required for signing up?",
    answer:
      "You only need to provide your email ID and name to create an account on GradeFlow. No additional personal details are required."
  },
  {
    question: "Does GradeFlow send reminders for assignments and deadlines?",
    answer:
      "Yes! GradeFlow sends notifications to remind you about upcoming assignments, deadlines, and study sessions to help you stay on track."
  },
  {
    question: "Can I attach notes to my assignments and study materials?",
    answer:
      "Absolutely! GradeFlow allows you to attach notes to your study materials, assignments, and lectures, making it easier to organize key concepts in one place."
  },
  {
    question: "Is my data safe with GradeFlow?",
    answer:
      "Yes, GradeFlow prioritizes user privacy and data security. We use secure database storage and ensure that only minimal personal information is required for signup."
  },
  {
    question: "Does GradeFlow use AI for study recommendations?",
    answer:
      "Yes! GradeFlow leverages an AI-powered sentence processing model (Xenova Transformer) to provide personalized study recommendations based on your progress and goals."
  },
];


export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className=''>
      <Navbar />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>

          <div className="relative mb-8">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search for a question"
              className="p-6 pl-12 rounded-full bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4 overflow-scroll h-[65vh] pr-5">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4 shadow-sm bg-white">
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <p className="text-center text-muted-foreground mt-4">No questions found matching your search.</p>
          )}
        </div>
      </div>
    </main>
  )
}