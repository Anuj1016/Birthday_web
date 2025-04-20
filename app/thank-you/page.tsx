"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Home, Share } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThankYouPage() {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Birthday Wishes for Anurag",
          text: "I just sent a birthday wish to Anurag! Send yours too!",
          url: window.location.origin,
        })
        .catch((error) => console.log("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard
        .writeText(window.location.origin)
        .then(() => alert("Link copied to clipboard! Share it with your friends."))
        .catch((err) => console.error("Failed to copy: ", err))
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 flex items-center justify-center p-4">
      {showConfetti && <div id="confetti-container" className="fixed inset-0 z-50 pointer-events-none" />}

      <Card className="max-w-md w-full p-8 shadow-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-purple-800 mb-4">Thank You!</h1>

          <p className="text-gray-600 mb-8">
            Your birthday wish has been sent to Anurag. Thank you for making his day special!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-purple-500 text-purple-700 hover:bg-purple-100"
              >
                <Home className="mr-2 h-5 w-5" /> Back to Home
              </Button>
            </Link>

            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              onClick={handleShare}
            >
              <Share className="mr-2 h-5 w-5" /> Share with Friends
            </Button>
          </div>
        </motion.div>
      </Card>
    </main>
  )
}